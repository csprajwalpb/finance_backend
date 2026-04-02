const AppError = require("../utils/appError");

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    return next(
      new AppError(
        result.error.issues.map((issue) => issue.message).join(", "),
        400
      )
    );
  }

  req.validated = result.data;
  next();
};

module.exports = validate;
