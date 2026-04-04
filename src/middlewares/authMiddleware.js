const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const { verifyAccessToken } = require("../utils/jwt");

const extractBearerToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    throw new AppError("Authorization header is required", 401);
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Authorization header must use Bearer token", 401);
  }

  return token;
};

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.header("authorization");
  const token = extractBearerToken(authorizationHeader);
  const payload = verifyAccessToken(token);

  const user = await prisma.user.findUnique({
    where: { id: Number(payload.sub) },
  });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  if (user.status !== "ACTIVE") {
    throw new AppError("User account is not active", 403);
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;
