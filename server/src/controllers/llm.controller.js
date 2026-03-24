const { runLLM } = require("../LLM/LLM");

const generateWithLLM = async (req, res) => {
  try {
    const { prompt, systemInstruction, model } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required in request body.",
      });
    }

    const text = await runLLM({
      prompt,
      systemInstruction,
      model,
    });

    return res.status(200).json({
      success: true,
      message: "LLM response generated successfully.",
      data: {
        prompt,
        response: text,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate LLM response.",
    });
  }
};

module.exports = {
  generateWithLLM,
};
