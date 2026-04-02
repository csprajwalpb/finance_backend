const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const { verifyToken } = require("../utils/jwt");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.header("authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new AppError("Authorization token is required", 401);
  }

  const token = authorizationHeader.split(" ")[1];
  const payload = verifyToken(token);

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
