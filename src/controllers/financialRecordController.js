const financialRecordService = require("../services/financialRecordService");

const listRecords = async (req, res) => {
  const { type, category, userId, dateFrom, dateTo, page, limit } =
    req.validated.query;

  const result = await financialRecordService.listRecords({
    type,
    category,
    userId: userId ? Number(userId) : undefined,
    dateFrom: dateFrom ? new Date(dateFrom) : undefined,
    dateTo: dateTo ? new Date(dateTo) : undefined,
    page,
    limit,
  });

  res.json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
};

const createRecord = async (req, res) => {
  const payload = {
    ...req.validated.body,
    userId: Number(req.validated.body.userId),
    amount: Number(req.validated.body.amount),
    recordDate: new Date(req.validated.body.recordDate),
  };

  const record = await financialRecordService.createRecord(payload);

  res.status(201).json({
    success: true,
    data: record,
  });
};

const getRecordById = async (req, res) => {
  const record = await financialRecordService.getRecordById(
    Number(req.validated.params.id)
  );

  res.json({
    success: true,
    data: record,
  });
};

const updateRecord = async (req, res) => {
  const body = req.validated.body;
  const payload = {
    ...(body.type && { type: body.type }),
    ...(body.category && { category: body.category }),
    ...(body.notes !== undefined && { notes: body.notes }),
    ...(body.userId !== undefined && { userId: Number(body.userId) }),
    ...(body.amount !== undefined && { amount: Number(body.amount) }),
    ...(body.recordDate && { recordDate: new Date(body.recordDate) }),
  };

  const record = await financialRecordService.updateRecord(
    Number(req.validated.params.id),
    payload
  );

  res.json({
    success: true,
    data: record,
  });
};

const deleteRecord = async (req, res) => {
  await financialRecordService.deleteRecord(Number(req.validated.params.id));

  res.status(204).send();
};

module.exports = {
  listRecords,
  createRecord,
  getRecordById,
  updateRecord,
  deleteRecord,
};
