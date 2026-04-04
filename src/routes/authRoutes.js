const express = require("express");
const { z } = require("zod");
const authController = require("../controllers/authController");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middlewares/validate");

const router = express.Router();

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "name is required"),
    email: z.string().email("valid email is required"),
    password: z.string().min(6, "password must be at least 6 characters"),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("valid email is required"),
    password: z.string().min(1, "password is required"),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "refreshToken is required"),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register)
);
router.post("/login", validate(loginSchema), asyncHandler(authController.login));
router.post(
  "/refresh",
  validate(refreshTokenSchema),
  asyncHandler(authController.refreshToken)
);
console.log("Auth routes loaded");

module.exports = router;
