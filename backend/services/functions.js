export function getApplicationStatus(userId) {
  return {
    status: "Approved",
    creditLimit: 5000,
    message: "Your card has been approved!",
  };
}

export function getTransactionStatus(transactionId) {
  return {
    status: "Failed",
    reason: "Insufficient funds",
    timestamp: "2026-03-15",
  };
}
