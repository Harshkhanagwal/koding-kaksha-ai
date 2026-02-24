const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      default: "gray" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
