export function classifyIntent(message, config) {
  const text = message.toLowerCase();

  // dynamic rules (auto-fix)
  for (let rule of config.dynamicRules) {
    if (text.includes(rule.pattern)) return rule.intent;
  }

  if (text.includes("application")) return "application_status";
  if (
    text.includes("transaction") ||
    text.includes("failed") ||
    text.includes("refund")
  )
    return "transaction_issue";

  return "kb_question";
}
