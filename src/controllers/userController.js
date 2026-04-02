const userService = require("../services/userService");

const listUsers = async (req, res) => {
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

const getUserById = async (req, res) => {
  const user = await userService.getUserById(Number(req.validated.params.id));

  res.json({
    success: true,
    data: user,
  });
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(
    Number(req.validated.params.id),
    req.validated.body
  );

  res.json({
    success: true,
    data: user,
  });
};

const deleteUser = async (req, res) => {
  await userService.deleteUser(Number(req.validated.params.id));

  res.status(204).send();
};

module.exports = {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
