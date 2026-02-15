const mongoose = require("mongoose");
const env = require("./config/env");

const connectDb = async () => {
  try {
    await mongoose.connect(env.mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

module.exports = connectDb;
