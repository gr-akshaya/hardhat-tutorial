const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Lock = await hre.ethers.getContractFactory("Multicall3");

  // Deploy the contract with the unlock time as a parameter
  const lock = await Lock.deploy();

  console.log(`Lock deployed to: ${lock.target}`);
}

// Handle async errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
