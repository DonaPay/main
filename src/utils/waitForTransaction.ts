import { aptosClient } from "./aptosClient";

export const waitForTransactionConfirmation = async (txHash: any) => {
  const interval = 1000;
  const maxAttempts = 10;

  let attempts = 0;

  return new Promise((resolve, reject) => {
    const checkTransactionStatus = async () => {
      try {
        const transactionInfo = await aptosClient().waitForTransaction({ transactionHash: txHash });

        const result = transactionInfo.success;

        if (result == true) {
          console.log("Transaction succeeded:", transactionInfo);
          resolve(transactionInfo); // Resolve on success
        } else {
          console.error("Transaction failed:", transactionInfo);
          reject(new Error("Transaction failed")); // Reject on failure
        }

        // Keep polling if transaction is not confirmed
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkTransactionStatus, interval); // Wait and retry
        } else {
          reject(new Error("Transaction status not available after multiple attempts."));
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
        reject(error); // Reject if there's an error
      }
    };

    // Start polling
    checkTransactionStatus();
  });
};
