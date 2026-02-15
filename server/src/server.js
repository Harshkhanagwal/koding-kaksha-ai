const app = require("./app");
const env = require("./config/env");
const connectDb = require("./db");

const startServer = async () => {
  try {
    await connectDb();

    const server = app.listen(env.port, () => {
      console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${env.port} is already in use. Set a different PORT in .env.`);
        process.exit(1);
      }

      console.error("Server failed to start:", error.message);
      process.exit(1);
    });

  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  }
};

startServer();
