const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const sanitizeUser = require("../utils/sanitizeUser");

const listUsers = () =>
  prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  }).then((users) => users.map(sanitizeUser));

const createUser = async (data) => {
  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
      status: data.status,
    },
  });

  return sanitizeUser(user);
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return sanitizeUser(user);
};

const updateUser = async (id, data) => {
  await getUserById(id);

  const updateData = {
    ...(data.name && { name: data.name }),
    ...(data.email && { email: data.email }),
    ...(data.role && { role: data.role }),
    ...(data.status && { status: data.status }),
  };

  if (data.password) {
    updateData.passwordHash = await bcrypt.hash(data.password, 10);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return sanitizeUser(user);
};

const deleteUser = async (id) => {
  await getUserById(id);

  const user = await prisma.user.delete({
    where: { id },
  });

  return sanitizeUser(user);
};

module.exports = {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
