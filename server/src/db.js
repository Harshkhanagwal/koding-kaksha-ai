const mongoose = require("mongoose");
const env = require("./config/env");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error(`Database connection failed: ${error}`);
  }
};

module.exports = connectDb;
