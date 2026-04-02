const express = require("express");
const { z } = require("zod");
const dashboardController = require("../controllers/dashboardController");
const asyncHandler = require("../utils/asyncHandler");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

const router = express.Router();

const recentTransactionsSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    limit: z.coerce.number().int().min(1).max(20).default(5),
  }),
});

router.get(
  "/summary",
  authorize("ANALYST"),
  asyncHandler(dashboardController.getSummary)
);
router.get(
  "/trends",
  authorize("ANALYST"),
  asyncHandler(dashboardController.getTrends)
);
router.get(
  "/category-totals",
  authorize("ANALYST"),
  asyncHandler(dashboardController.getCategoryTotals)
);
router.get(
  "/recent-transactions",
  authorize("ANALYST"),
  validate(recentTransactionsSchema),
  asyncHandler(dashboardController.getRecentTransactions)
);

module.exports = router;
