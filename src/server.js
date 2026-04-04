const app = require("./app");
const env = require("./config/env");
const prisma = require("./config/prisma");

let server;

const shutdown = async (exitCode = 1) => {
  try {
    await prisma.$disconnect();
  } finally {
    if (server) {
      server.close(() => {
        process.exit(exitCode);
      });
      return;
    }

    process.exit(exitCode);
  }
};

const startServer = async () => {
  try {
    await prisma.$connect();

    server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection", error);
  shutdown(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception", error);
  shutdown(1);
});

startServer();
