const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const { signToken } = require("../utils/jwt");
const sanitizeUser = require("../utils/sanitizeUser");

const buildAuthResponse = (user) => ({
  token: signToken({
    sub: user.id,
    role: user.role,
  }),
  user: sanitizeUser(user),
});

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
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status !== "ACTIVE") {
    throw new AppError("User account is not active", 403);
  }

  return buildAuthResponse(user);
};

module.exports = {
  register,
  login,
};
