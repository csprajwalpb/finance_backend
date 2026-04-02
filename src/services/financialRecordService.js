const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

const listRecords = ({ type, category, userId }) =>
  prisma.financialRecord.findMany({
    where: {
      ...(type && { type }),
      ...(category && { category }),
      ...(userId && { userId }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: { recordDate: "desc" },
  });

const createRecord = (data) =>
  prisma.financialRecord.create({
    data,
  });

const getRecordById = async (id) => {
  const record = await prisma.financialRecord.findUnique({
    where: { id },
  });

  if (!record) {
    throw new AppError("Financial record not found", 404);
  }

  return record;
};

const updateRecord = async (id, data) => {
  await getRecordById(id);

  return prisma.financialRecord.update({
    where: { id },
    data,
  });
};

const deleteRecord = async (id) => {
  await getRecordById(id);

  return prisma.financialRecord.delete({
    where: { id },
  });
};

module.exports = {
  listRecords,
  createRecord,
  getRecordById,
  updateRecord,
  deleteRecord,
};
