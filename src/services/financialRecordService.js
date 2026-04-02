const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  status: true,
};

const buildWhereClause = ({ type, category, userId, dateFrom, dateTo }) => ({
  ...(type && { type }),
  ...(category && {
    category: {
      contains: category,
    },
  }),
  ...(userId && { userId }),
  ...((dateFrom || dateTo) && {
    recordDate: {
      ...(dateFrom && { gte: dateFrom }),
      ...(dateTo && { lte: dateTo }),
    },
  }),
});

const listRecords = async ({
  type,
  category,
  userId,
  dateFrom,
  dateTo,
  page,
  limit,
}) => {
  const where = buildWhereClause({
    type,
    category,
    userId,
    dateFrom,
    dateTo,
  });
  const skip = (page - 1) * limit;

  const [records, total] = await Promise.all([
    prisma.financialRecord.findMany({
      where,
      include: {
        user: {
          select: userSelect,
        },
      },
      orderBy: { recordDate: "desc" },
      skip,
      take: limit,
    }),
    prisma.financialRecord.count({ where }),
  ]);

  return {
    data: records,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const createRecord = (data) =>
  prisma.financialRecord.create({
    data,
    include: {
      user: {
        select: userSelect,
      },
    },
  });

const getRecordById = async (id) => {
  const record = await prisma.financialRecord.findUnique({
    where: { id },
    include: {
      user: {
        select: userSelect,
      },
    },
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
    include: {
      user: {
        select: userSelect,
      },
    },
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
