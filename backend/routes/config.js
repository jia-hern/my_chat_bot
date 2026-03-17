import express from "express";
import fs from "fs-extra";

const router = express.Router();
const CONFIG_PATH = "./data/config.json";

router.get("/", async (req, res) => {
  res.json(await fs.readJson(CONFIG_PATH));
});

router.post("/", async (req, res) => {
  await fs.writeJson(CONFIG_PATH, req.body, { spaces: 2 });
  res.json({ success: true });
});

export default router;
