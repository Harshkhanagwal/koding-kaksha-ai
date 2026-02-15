const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5001,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET
};

if (!env.mongoUrl) {
  throw new Error("MONGO_URL is missing. Create a .env file and set MONGO_URL.");
}

module.exports = env;
