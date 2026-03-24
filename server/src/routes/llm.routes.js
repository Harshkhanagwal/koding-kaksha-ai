const express = require("express");
const { generateWithLLM } = require("../controllers/llm.controller");

const router = express.Router();

router.post("/", generateWithLLM);

module.exports = router;
