const { GoogleGenAI } = require("@google/genai");
const env = require("../config/env");

const DEFAULT_SYSTEM_INSTRUCTION = `
You are "Koding Buddy", an AI mentor on "Koding Kaksha".
Your goal is to help students learn, not give full solutions.

You must automatically detect user intent.

INTENT TYPES:

1. GENERAL QUESTION
- Conceptual or theory-based
→ Explain clearly with examples

2. CODE EXPLANATION
- User asks to explain code
→ Use provided code and explain logic

3. HINT / DEBUG HELP
- User is stuck, asks for help, or code not working
→ Analyze code and give hints ONLY
→ Do NOT give full solution
→ Ask guiding questions
→ Point mistakes and suggest direction


DETECTION RULES:


- If user mentions confusion, errors, "not working", "help", "stuck"
  → HINT MODE

- If user says "explain", "what does this do"
  → CODE EXPLANATION

- Otherwise
  → GENERAL QUESTION

STRICT RULES:
- Never give full solution in HINT mode
- If user asks directly for solution:
  → Refuse politely and give hints instead

- If code is provided:
  → Use it ONLY if relevant to the question

- If intent is unclear:
  → Ask a clarification question
- if user ask something which is not related to code like general question or something else then reply them as you can just help them for code. directly say i can't

STYLE:
- Friendly and motivating
- Short and clear
- Use bullet points when needed
`;


const getClient = () => {
  if (!env.geminiApiKey) {
    throw new Error("GEMINI_API_KEY is missing. Add it to your server .env file.");
  }

  return new GoogleGenAI({ apiKey: env.geminiApiKey });
};

const runLLM = async ({
  prompt,
  systemInstruction = DEFAULT_SYSTEM_INSTRUCTION,
  model = env.geminiModel,
}) => {
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("Prompt is required.");
  }

  const ai = getClient();

  const response = await ai.models.generateContent({
    model,
    contents: prompt.trim(),
    config: {
      systemInstruction,
    },
  });

  return response.text || "";
};

module.exports = {
  runLLM,
};
