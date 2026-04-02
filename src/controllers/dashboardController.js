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

const getCategoryBreakdown = async (req, res) => {
  const breakdown = await dashboardService.getCategoryBreakdown();

  res.json({
    success: true,
    data: breakdown,
  });
};

module.exports = {
  getSummary,
  getTrends,
  getCategoryBreakdown,
};
