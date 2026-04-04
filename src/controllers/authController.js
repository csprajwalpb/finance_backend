const authService = require("../services/authService");

const register = async (req, res) => {
  const result = await authService.register(req.validated.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

const login = async (req, res) => {
  const result = await authService.login(req.validated.body);

  res.json({
    success: true,
    data: result,
  });
};

const refreshToken = async (req, res) => {
  const result = await authService.refreshAccessToken(req.validated.body);

  res.json({
    success: true,
    data: result,
  });
};

module.exports = {
  register,
  login,
  refreshToken,
};
