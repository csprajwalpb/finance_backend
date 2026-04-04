const { Prisma } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";
  let details = error.details || null;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      statusCode = 409;
      message = "A record with this value already exists";
    }

    if (error.code === "P2003") {
      statusCode = 400;
      message = "Related record does not exist";
    }
  }

  if (error instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid authentication token";
  }

  if (error instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = "Authentication token has expired";
  }

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    statusCode = 400;
    message = "Invalid JSON payload";
    details = [
      {
        path: "body",
        message: "Request body contains invalid JSON",
      },
    ];
  }

  if (statusCode >= 500 && process.env.NODE_ENV === "production") {
    message = "Internal server error";
    details = null;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    ...(details && { errors: details }),
    ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
  });
};

module.exports = errorHandler;
