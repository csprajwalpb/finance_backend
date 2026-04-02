const express = require("express");
const { z } = require("zod");
const userController = require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middlewares/validate");
const authorize = require("../middlewares/authorize");

const router = express.Router();

const roleEnum = z.enum(["VIEWER", "ANALYST", "ADMIN"]);
const statusEnum = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);

const idSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, "name is required"),
    email: z.string().email("valid email is required"),
    password: z.string().min(6, "password must be at least 6 characters"),
    role: roleEnum,
    status: statusEnum.default("ACTIVE"),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: roleEnum.optional(),
    status: statusEnum.optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
  query: z.object({}).optional(),
});

router.get("/", authorize("ADMIN"), asyncHandler(userController.listUsers));
router.post(
  "/",
  authorize("ADMIN"),
  validate(createUserSchema),
  asyncHandler(userController.createUser)
);
router.get(
  "/:id",
  authorize("ADMIN"),
  validate(idSchema),
  asyncHandler(userController.getUserById)
);
router.patch(
  "/:id",
  authorize("ADMIN"),
  validate(updateUserSchema),
  asyncHandler(userController.updateUser)
);
router.delete(
  "/:id",
  authorize("ADMIN"),
  validate(idSchema),
  asyncHandler(userController.deleteUser)
);

module.exports = router;
