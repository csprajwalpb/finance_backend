const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  const users = await userService.listUsers();

  res.json({
    success: true,
    data: users,
  });
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.validated.body);

  res.status(201).json({
    success: true,
    data: user,
  });
};

const updateUserAccess = async (req, res) => {
  const user = await userService.updateUserAccess(
    Number(req.validated.params.id),
    req.validated.body
  );

  res.json({
    success: true,
    data: user,
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUserAccess,
};
