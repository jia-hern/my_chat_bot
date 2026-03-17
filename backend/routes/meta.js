import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { instructions } = req.body;

  // mock meta-agent output
  const generatedAgent = {
    intents: ["kb_question", "application_status", "transaction_issue"],
    rules: instructions,
  };

  res.json(generatedAgent);
});

export default router;
