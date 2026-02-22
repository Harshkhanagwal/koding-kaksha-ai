const axios = require("axios");
const Question = require("../models/questionModel");

const smartCompare = (expected, actual) => {
  if (!expected || !actual) return false;

  expected = expected.trim();
  actual = actual.trim();


  if (expected === actual) return true;


  if (!isNaN(expected) && !isNaN(actual)) {
    return Math.abs(Number(expected) - Number(actual)) < 1e-6;
  }

  const normalizeArray = (str) =>
    str
      .replace(/[\[\]]/g, "")
      .split(/[\s,]+/)
      .filter(Boolean);

  const expectedArr = normalizeArray(expected);
  const actualArr = normalizeArray(actual);

  if (expectedArr.length > 1 || actualArr.length > 1) {
    if (expectedArr.length !== actualArr.length) return false;

    return expectedArr.every((val, i) => val === actualArr[i]);
  }


  return expected === actual;
};


const compile = async (input, code, language) => {
  try {
    const response = await axios.post(
      "https://code-runner.p.rapidapi.com/run_code",
      {
        code: code,
        language: language,
        input: input
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "code-runner.p.rapidapi.com"
        }
      }
    );

    return response.data.output || response.data.stderr || "";
  } catch (error) {
    console.error("Compile Error:", error.response?.data || error.message);
    return "ERROR";
  }
};


const runTestcases = async (req, res) => {
  try {
    const { id, code, language } = req.body;

    if (!id || !code || !language) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Invalid Question"
      });
    }

    const results = [];

    for (let i = 0; i < question.testcases.length; i++) {
      const testcase = question.testcases[i];

      const rawOutput = await compile(
        testcase.input,
        code,
        language
      );

      const expected = testcase.output;
      const actual = rawOutput;

      const passed = smartCompare(expected, actual);

      console.log("Expected:", expected.trim());
      console.log("Actual:", actual.trim());

      results.push({
        case: i + 1,
        expected: expected.trim(),
        actual: actual.trim(),
        passed
      });
    }

    const allPassed = results.every(r => r.passed);

    return res.status(200).json({
      success: true,
      allPassed,
      results
    });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = runTestcases;