const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const asyncHandler = require("../utils/asyncHandler");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.get(
  "/summary",
  authorize("VIEWER", "ANALYST", "ADMIN"),
  asyncHandler(dashboardController.getSummary)
);
router.get(
  "/trends",
  authorize("VIEWER", "ANALYST", "ADMIN"),
  asyncHandler(dashboardController.getTrends)
);
router.get(
  "/category-breakdown",
  authorize("VIEWER", "ANALYST", "ADMIN"),
  asyncHandler(dashboardController.getCategoryBreakdown)
);

module.exports = router;
