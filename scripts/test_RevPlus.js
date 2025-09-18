import { createPublicClient, createWalletClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// IMPORTANT: Replace with your private key
const privateKey = "xxx";
const account = privateKeyToAccount(privateKey);

// --- Configuration ---
// ERC20 Token Contract Address
const tokenAddress = "0xaBfC1162999DAEa5962c64537aEC40388d6980cD";
// Recipient address
const recipientAddress = "0x7e5C92fA765Aac46042AfBba05b0F3846C619423"; // Replace with the actual recipient

// Loop configuration
const iterations = 100; // Number of transfers
const delayBetweenCalls = 1000; // 1 second between calls

// Custom RPC URL from your original script
const rpcUrl = "https://rpc.test2.btcs.network";
// --- End Configuration ---

const abi = [
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Define a custom chain for the test environment from your original script
const customChain = {
  id: 1114,
  name: "Custom Test Chain",
  network: "custom",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [rpcUrl],
    },
    public: {
      http: [rpcUrl],
    },
  },
};

// Set up the public client for reading from the blockchain
const publicClient = createPublicClient({
  chain: customChain,
  transport: http(rpcUrl),
});

// Set up the wallet client for writing to the blockchain
const walletClient = createWalletClient({
  account,
  chain: customChain,
  transport: http(rpcUrl),
});

// Helper function to sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendTransfer(amount) {
  try {
    console.log(`Transferring 1 token to ${recipientAddress}...`);

    const hash = await walletClient.writeContract({
      address: tokenAddress,
      abi,
      functionName: "transfer",
      args: [recipientAddress, amount],
    });

    console.log("Transaction hash:", hash);

    console.log("Waiting for transaction to be mined...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    console.log("Transaction mined!");
    console.log("Gas used:", receipt.gasUsed.toString());

    return { hash, receipt };
  } catch (error) {
    console.error("Error sending transaction:", error);
    // Re-throwing the error to be caught by the main loop
    throw error;
  }
}

async function runTransferLoop() {
  console.log(`Starting transfer loop for ${iterations} iterations...`);

  let successCount = 0;
  let failureCount = 0;

  console.log("Fetching token decimals...");
  const decimals = await publicClient.readContract({
    address: tokenAddress,
    abi,
    functionName: "decimals",
  });
  console.log(`Token decimals: ${decimals}`);
  const amountToSend = parseUnits("1", decimals);

  for (let i = 1; i <= iterations; i++) {
    console.log(`\n===== Iteration ${i}/${iterations} =====`);

    try {
      await sendTransfer(amountToSend);
      successCount++;
      console.log(`Transfer successful! (${successCount} successful so far)`);
    } catch (error) {
      failureCount++;
      console.error(
        `Transfer attempt ${i} failed. (${failureCount} failures so far)`
      );
    }

    if (i < iterations) {
      console.log(
        `Waiting ${delayBetweenCalls / 1000} seconds before next transfer...`
      );
      await sleep(delayBetweenCalls);
    }
  }

  console.log("\n===== Transfer loop completed =====");
  console.log(
    `Results: ${successCount} successful, ${failureCount} failed out of ${iterations} attempts`
  );
}

runTransferLoop()
  .then(() => {
    console.log("Transfer loop finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error in transfer loop:", error);
    process.exit(1);
  });
