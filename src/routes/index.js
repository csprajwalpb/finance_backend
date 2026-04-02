const express = require("express");
const userRoutes = require("./userRoutes");
const financialRecordRoutes = require("./financialRecordRoutes");
const dashboardRoutes = require("./dashboardRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/financial-records", financialRecordRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
