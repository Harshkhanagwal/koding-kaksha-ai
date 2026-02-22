const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.Controller");
const runTestcases = require("../controllers/compiler.Controller")


router.post("/add", questionController.createQuestion);
router.get("/all", questionController.getAllQuestions);
router.get("/details/:id", questionController.getQuestionById);
router.put("/update/:id", questionController.updateQuestion);
router.delete("/delete/:id", questionController.deleteQuestion);
router.post("/compile", runTestcases );

router.post("/demo-compile", async (req, res) => {
  try {
    const { id, code, language } = req.body;

    if (!id || !code || !language) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }
     await new Promise(resolve => setTimeout(resolve, 1500));

    const results = [
      {
        case: 1,
        expected: "0 1",
        actual: "0 1",
        passed: true
      },
      {
        case: 2,
        expected: "1 2",
        actual: "1 3",
        passed: false
      },
      {
        case: 3,
        expected: "2 3",
        actual: "2 3",
        passed: true
      }
    ];

    const allPassed = results.every(r => r.passed);

    return res.status(200).json({
      success: true,
      allPassed,
      results,
      executionTime: "0.18s",
      memoryUsed: "22MB"
    });

  } catch (error) {
    console.error("Demo Compile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});



module.exports = router;