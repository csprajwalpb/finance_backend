const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const financialRecordRoutes = require("./financialRecordRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/records", authMiddleware, financialRecordRoutes);
router.use("/financial-records", authMiddleware, financialRecordRoutes);
router.use("/dashboard", authMiddleware, dashboardRoutes);

module.exports = router;
