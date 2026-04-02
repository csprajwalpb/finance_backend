const AppError = require("../utils/appError");

const roleLevels = {
  VIEWER: 1,
  ANALYST: 2,
  ADMIN: 3,
};

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  const userRoleLevel = roleLevels[req.user.role] || 0;
  const minimumRequiredLevel = Math.min(
    ...allowedRoles.map((role) => roleLevels[role] || Number.MAX_SAFE_INTEGER)
  );

  if (userRoleLevel < minimumRequiredLevel) {
    return next(new AppError("Forbidden", 403));
  }

  next();
};

module.exports = authorize;
