import axios from "axios";

const OLLAMA_URL = "http://localhost:11434/api/generate";

export async function callLLM({ message, config }) {
  const prompt = `
You are a customer service AI for Atome Card.

Knowledge Base URL:
${config.knowledgeBaseUrl}

Rules:
${config.rules.join("\n")}

Instructions:
- Follow the rules strictly
- If question relates to application status or transactions, DO NOT answer directly
- Otherwise, answer using the knowledge base

User:
${message}

Answer:
`;

  try {
    const res = await axios.post(OLLAMA_URL, {
      model: "pielee/qwen3-4b-thinking-2507_q8",
      prompt,
      stream: false,
    });

    return res.data.response;
  } catch (err) {
    console.error("Ollama error:", err.message);
    return "Error connecting to AI model.";
  }
}
