import fs from "fs-extra";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "data", "config.json");

export async function autoFix(mistake) {
  const config = await fs.readJson(CONFIG_PATH);

  // Only auto-fix if it's a wrong intent mistake
  if (mistake.errorType === "wrong_intent") {
    // Check if the rule already exists
    const exists = config.dynamicRules.some(
      (rule) => rule.pattern === mistake.query.toLowerCase()
    );

    if (!exists) {
      // Add a new dynamic rule using the user input
      config.dynamicRules.push({
        pattern: mistake.query.toLowerCase(),
        // Guess intent based on botResponse (simple heuristic)
        intent: mistake.botResponse.toLowerCase().includes("transaction")
          ? "transaction_issue"
          : mistake.botResponse.toLowerCase().includes("approved")
          ? "application_status"
          : "kb_question",
      });

      console.log("Auto-fix applied for mistake:", mistake.query);
    }
  }

  await fs.writeJson(CONFIG_PATH, config, { spaces: 2 });

  // Mark mistake as resolved in mistakes.json
  const mistakesPath = path.join(process.cwd(), "data", "mistakes.json");
  const mistakes = await fs.readJson(mistakesPath);

  const idx = mistakes.findIndex((m) => m.id === mistake.id);
  if (idx !== -1) {
    mistakes[idx].resolved = true;
    await fs.writeJson(mistakesPath, mistakes, { spaces: 2 });
  }
}
