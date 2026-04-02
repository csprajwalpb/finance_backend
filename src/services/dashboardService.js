const prisma = require("../config/prisma");

const toNumber = (value) => Number(value || 0);

const getSummary = async () => {
  const grouped = await prisma.financialRecord.groupBy({
    by: ["type"],
    _sum: { amount: true },
  });

  const totals = grouped.reduce(
    (accumulator, item) => {
      const amount = toNumber(item._sum.amount);

      if (item.type === "INCOME") {
        accumulator.totalIncome = amount;
      }

      if (item.type === "EXPENSE") {
        accumulator.totalExpense = amount;
      }

      accumulator.netAmount =
        accumulator.totalIncome - accumulator.totalExpense;

      return accumulator;
    },
    {
      totalIncome: 0,
      totalExpense: 0,
      netAmount: 0,
    }
  );

  return totals;
};

const getCategoryTotals = async () => {
  const grouped = await prisma.financialRecord.groupBy({
    by: ["type", "category"],
    _sum: { amount: true },
    orderBy: {
      category: "asc",
    },
  });

  return grouped.map((item) => ({
    type: item.type,
    category: item.category,
    totalAmount: toNumber(item._sum.amount),
  }));
};

const getRecentTransactions = async (limit) =>
  prisma.financialRecord.findMany({
    take: limit,
    orderBy: [
      { recordDate: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });

const getMonthlyTrends = async () => {
  const records = await prisma.financialRecord.findMany({
    select: {
      type: true,
      amount: true,
      recordDate: true,
    },
    orderBy: {
      recordDate: "asc",
    },
  });

  const trendMap = records.reduce((accumulator, record) => {
    const month = record.recordDate.toISOString().slice(0, 7);

    if (!accumulator[month]) {
      accumulator[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (record.type === "INCOME") {
      accumulator[month].income += toNumber(record.amount);
    } else {
      accumulator[month].expense += toNumber(record.amount);
    }

    return accumulator;
  }, {});

  return Object.values(trendMap).map((item) => ({
    ...item,
    netAmount: item.income - item.expense,
  }));
};

module.exports = {
  getSummary,
  getCategoryTotals,
  getRecentTransactions,
  getMonthlyTrends,
};
