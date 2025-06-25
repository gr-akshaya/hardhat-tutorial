require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          evmVersion: "shanghai",
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {},
    core_mainnet: {
      url: "https://rpc.coredao.org/",
      accounts: [process.env.PRIVATEKEY],
      chainId: 1116,
    },
    core_testnet2: {
      url: "https://rpc.test2.btcs.network",
      accounts: [process.env.PRIVATEKEY],
      chainId: 1114,
    },
  },
  etherscan: {
    apiKey: {
      core_testnet2: process.env.CORE_TEST2_SCAN_KEY,
      core_mainnet: process.env.CORE_MAIN_SCAN_KEY,
    },
    customChains: [
      {
        network: "core_testnet2",
        chainId: 1114,
        urls: {
          apiURL: "https://api.test2.btcs.network/api",
          browserURL: "https://scan.test2.btcs.network/",
        },
      },
      {
        network: "core_mainnet",
        chainId: 1116,
        urls: {
          apiURL: "https://openapi.coredao.org/api",
          browserURL: "https://scan.coredao.org/",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
