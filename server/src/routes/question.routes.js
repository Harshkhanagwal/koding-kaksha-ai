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


module.exports = router;