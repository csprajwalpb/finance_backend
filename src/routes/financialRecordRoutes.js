const express = require("express");
const { z } = require("zod");
const financialRecordController = require("../controllers/financialRecordController");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middlewares/validate");
const authorize = require("../middlewares/authorize");

const router = express.Router();

const typeEnum = z.enum(["INCOME", "EXPENSE"]);

const idSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const listRecordSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({
    type: typeEnum.optional(),
    category: z.string().optional(),
    userId: z.string().regex(/^\d+$/, "userId must be a number").optional(),
  }),
});

const createRecordSchema = z.object({
  body: z.object({
    userId: z.coerce.number(),
    type: typeEnum,
    category: z.string().min(2, "category is required"),
    amount: z.coerce.number().positive("amount must be greater than 0"),
    notes: z.string().max(500).optional(),
    recordDate: z.string().datetime("recordDate must be an ISO date string"),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateRecordSchema = z.object({
  body: z.object({
    userId: z.coerce.number().optional(),
    type: typeEnum.optional(),
    category: z.string().min(2).optional(),
    amount: z.coerce.number().positive().optional(),
    notes: z.string().max(500).nullable().optional(),
    recordDate: z.string().datetime().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a number"),
  }),
  query: z.object({}).optional(),
});

router.get(
  "/",
  authorize("ANALYST", "ADMIN", "VIEWER"),
  validate(listRecordSchema),
  asyncHandler(financialRecordController.listRecords)
);
router.post(
  "/",
  authorize("ANALYST", "ADMIN"),
  validate(createRecordSchema),
  asyncHandler(financialRecordController.createRecord)
);
router.get(
  "/:id",
  authorize("ANALYST", "ADMIN", "VIEWER"),
  validate(idSchema),
  asyncHandler(financialRecordController.getRecordById)
);
router.patch(
  "/:id",
  authorize("ANALYST", "ADMIN"),
  validate(updateRecordSchema),
  asyncHandler(financialRecordController.updateRecord)
);
router.delete(
  "/:id",
  authorize("ADMIN"),
  validate(idSchema),
  asyncHandler(financialRecordController.deleteRecord)
);

module.exports = router;
