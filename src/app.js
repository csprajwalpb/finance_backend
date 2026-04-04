const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const rateLimit = require("./middlewares/rateLimit");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
