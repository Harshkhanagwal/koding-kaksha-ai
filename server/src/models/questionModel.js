const mongoose = require("mongoose");
const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    isSample: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    tags: [String],

    content: {
      type: String, // Rich HTML content
      required: true,
    },

    testcases: [testCaseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);