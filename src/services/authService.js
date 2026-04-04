const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const sanitizeUser = require("../utils/sanitizeUser");
const env = require("../config/env");

const refreshTokens = new Map();

const buildTokenPayload = (user) => ({
  sub: user.id,
  role: user.role,
});

const buildAuthResponse = (user) => {
  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  refreshTokens.set(refreshToken, user.id);

  return {
    accessToken,
    refreshToken,
    expiresIn: env.jwtExpiresIn,
    tokenType: "Bearer",
    user: sanitizeUser(user),
  };
};

const getActiveUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status !== "ACTIVE") {
    throw new AppError("User account is not active", 403);
  }

  return user;
};

const register = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "VIEWER",
      status: "ACTIVE",
    },
  });

  return buildAuthResponse(user);
};

const login = async ({ email, password }) => {
  const user = await getActiveUser(email);

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  return buildAuthResponse(user);
};

const refreshAccessToken = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }

  const payload = verifyRefreshToken(refreshToken);
  const storedUserId = refreshTokens.get(refreshToken);

  if (!storedUserId || storedUserId !== Number(payload.sub)) {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(payload.sub) },
  });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  if (user.status !== "ACTIVE") {
    throw new AppError("User account is not active", 403);
  }

  refreshTokens.delete(refreshToken);

  return buildAuthResponse(user);
};

module.exports = {
  register,
  login,
  refreshAccessToken,
};
