import express from "express";
import fs from "fs-extra";

import { callLLM } from "../services/llm.js";
import { classifyIntent } from "../services/intentClassifier.js";
import { answerFromKB } from "../services/knowledgeBase.js";
import {
  getApplicationStatus,
  getTransactionStatus,
} from "../services/functions.js";

const router = express.Router();

const CONFIG_PATH = "./data/config.json";

let pendingTransaction = {};

router.post("/", async (req, res) => {
  const { message, userId } = req.body;
  const config = await fs.readJson(CONFIG_PATH);

  // Check if waiting for transaction ID
  if (pendingTransaction[userId]) {
    const result = getTransactionStatus(message);
    pendingTransaction[userId] = false;

    return res.json({
      reply: `Transaction Status: ${result.status}, Reason: ${result.reason}`,
    });
  }

  const intent = classifyIntent(message, config);

  if (intent === "application_status") {
    const result = getApplicationStatus(userId);
    return res.json({
      reply: `Application Status: ${result.status}`,
    });
  }

  if (intent === "transaction_issue") {
    pendingTransaction[userId] = true;
    return res.json({
      reply: "Please provide your transaction ID.",
    });
  }

  const answer = await callLLM({ message, config });
  res.json({ reply: answer });
});

export default router;
