import express from "express";
import fs from "fs-extra";
import { autoFix } from "../services/autoFixer.js";

const router = express.Router();
const MISTAKES_PATH = "./data/mistakes.json";

router.get("/", async (req, res) => {
  const data = await fs.readJson(MISTAKES_PATH);
  res.json(data);
});

router.post("/", async (req, res) => {
  const mistakes = await fs.readJson(MISTAKES_PATH);
  const newMistake = {
    ...req.body, // now includes query + botResponse + errorType
    id: Date.now(),
    resolved: false,
  };

  mistakes.push(newMistake);
  await fs.writeJson(MISTAKES_PATH, mistakes, { spaces: 2 });

  await autoFix(newMistake);

  res.json({ success: true });
});

export default router;
