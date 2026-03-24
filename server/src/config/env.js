const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5002,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET, 
  cors_url : process.env.CORS_URL,
  geminiApiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || "gemini-2.5-flash",
};

if (!env.mongoUrl) {
  throw new Error("MONGO_URL is missing. Create a .env file and set MONGO_URL.");
}

module.exports = env;
