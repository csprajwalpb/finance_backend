const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const asyncHandler = require("../utils/asyncHandler");
const authorize = require("../middlewares/authorize");

const router = express.Router();

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
  "/category-breakdown",
  authorize("ANALYST"),
  asyncHandler(dashboardController.getCategoryBreakdown)
);

module.exports = router;
