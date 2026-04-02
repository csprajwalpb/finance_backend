const dashboardService = require("../services/dashboardService");

const getSummary = async (req, res) => {
  const summary = await dashboardService.getSummary();

  res.json({
    success: true,
    data: summary,
  });
};

const getTrends = async (req, res) => {
  const trends = await dashboardService.getMonthlyTrends();

  res.json({
    success: true,
    data: trends,
  });
};

const getCategoryTotals = async (req, res) => {
  const breakdown = await dashboardService.getCategoryTotals();

  res.json({
    success: true,
    data: breakdown,
  });
};

const getRecentTransactions = async (req, res) => {
  const transactions = await dashboardService.getRecentTransactions(
    req.validated.query.limit
  );

  res.json({
    success: true,
    data: transactions,
  });
};

module.exports = {
  getSummary,
  getTrends,
  getCategoryTotals,
  getRecentTransactions,
};
