require("dotenv").config();
const { ethers } = require("hardhat");

const tokenAddress = "0xaBfC1162999DAEa5962c64537aEC40388d6980cD"; //"0xaBfC1162999DAEa5962c64537aEC40388d6980cD";
const recipientAddress = "0x1b984521b42D3B9aCFCf37565Ab865f318b1Cd92";

const abi = [
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
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
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  const token = new ethers.Contract(tokenAddress, abi, signer);

  console.log("Fetching token decimals...");
  const decimals = await token.decimals();
  const amount = ethers.parseUnits("1", decimals);

  console.log(`Transferring 1 token to ${recipientAddress}...`);

  // Estimate gas for the transfer
  const estimatedGas = await token.transfer.estimateGas(
    recipientAddress,
    amount
  );
  console.log("Estimated gas:", estimatedGas.toString());

  // Add 20% buffer to estimated gas
  //const gasLimit = Math.floor(estimatedGas * 1.2);

  const tx = await token.transfer(recipientAddress, amount, {
    gasLimit: estimatedGas,
  });
  console.log("Transaction hash:", tx.hash);

  console.log("Waiting for confirmation...");
  const receipt = await tx.wait();
  console.log("Transaction confirmed. Gas used:", receipt.gasUsed.toString());
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
