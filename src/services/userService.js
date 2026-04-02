const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

const listUsers = () =>
  prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

const createUser = (data) =>
  prisma.user.create({
    data,
  });

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const updateUser = async (id, data) => {
  await getUserById(id);

  return prisma.user.update({
    where: { id },
    data,
  });
};

const deleteUser = async (id) => {
  await getUserById(id);

  return prisma.user.delete({
    where: { id },
  });
};

module.exports = {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
