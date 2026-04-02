const express = require("express");
const { z } = require("zod");
const userController = require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middlewares/validate");
const authorize = require("../middlewares/authorize");

const router = express.Router();

const roleEnum = z.enum(["VIEWER", "ANALYST", "ADMIN"]);
const statusEnum = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);

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

const updateUserAccessSchema = z.object({
  body: z
    .object({
      role: roleEnum.optional(),
      status: statusEnum.optional(),
    })
    .refine(
      (body) => body.role !== undefined || body.status !== undefined,
      "At least one of role or status is required"
    ),
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
  query: z.object({}).optional(),
});

router.get("/", authorize("ADMIN"), asyncHandler(userController.getAllUsers));
router.post(
  "/",
  authorize("ADMIN"),
  validate(createUserSchema),
  asyncHandler(userController.createUser)
);
router.patch(
  "/:id",
  authorize("ADMIN"),
  validate(updateUserAccessSchema),
  asyncHandler(userController.updateUserAccess)
);

module.exports = router;
