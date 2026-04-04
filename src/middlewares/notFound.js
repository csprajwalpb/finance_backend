const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route not found: ${req.originalUrl}`,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};

module.exports = notFound;
