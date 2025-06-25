# 🚀 Core - Hardhat Starter Kit

This project demonstrates how to compile, deploy, and interact with smart contracts on the Core using [Hardhat](https://hardhat.org/). It supports both **Core Mainnet** and **Core Testnet2**.

> ✅ Recommended for developers building and testing smart contracts on Core.

## 📌 Features

- Multi-network support (Core Mainnet, Testnet2)
- Configurable Solidity compiler versions and EVM settings
- Integration with block explorers for contract verification
- Optimized for performance with Hardhat’s toolbox
- Structured project setup with support for scripts and testing

> ❗ **Note:** Hardhat Ignition is currently not compatible with Core Blockchain.  
> Use custom deployment scripts (`scripts/deploy.js`) instead.

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/coredao-org/hardhat-tutorial.git
cd hardhat-tutorial
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
PRIVATEKEY="your_core_wallet_private_key"
CORE_MAIN_SCAN_KEY="your_mainnet_explorer_api_key"
CORE_TEST2_SCAN_KEY="your_testnet2_explorer_api_key"
```

> ⚠️ **Important:** Never share your private key or commit the `.env` file to version control.

---

## 🛠 Hardhat Commands

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Deploy & Interact (Recommended)

Use a deployment script instead of Hardhat Ignition.

```bash
npx hardhat run scripts/deploy.js --network <network_name>
```

Replace `<network_name>` with one of:

- `core_mainnet`
- `core_testnet2`

Example:

```bash
npx hardhat run scripts/deploy.js --network core_testnet2
```

---

## 🧠 Compiler Notes

The project is configured to support multiple Core environments:

- **Testnet2 & Mainnet:**
  - Solidity version: `0.8.24`
  - EVM version: `Shanghai`

---

## 🌐 Network Configuration

All networks are pre-configured in `hardhat.config.js`:

```js
networks: {
  core_mainnet: {
    url: "https://rpc.coredao.org/",
    accounts: [process.env.PRIVATEKEY],
    chainId: 1116,
  },
  core_testnet2: {
    url: "https://rpc.test2.btcs.network",
    accounts: [process.env.PRIVATEKEY],
    chainId: 1114,
  }
}
```

---

## 🔍 Contract Verification

Supports contract verification via Core block explorers.

Example command:

```bash
npx hardhat verify --network core_testnet2 <deployed_contract_address> <constructor_args_if_any>
```

API keys for verification should be placed in your `.env` file.

---

## 🚫 Hardhat Ignition Note

> ⚠️ `hardhat-ignition` is **not supported** for Core Blockchain.

To deploy contracts, always use a custom deployment script like:

```js
// scripts/deploy.js
```

This ensures compatibility with Core's RPC structure and avoids issues during deployment.

## 📚 Resources

- [Core Docs](https://docs.coredao.org/)
- [Hardhat Docs](https://hardhat.org/)
- [CoreScan](https://scan.coredao.org/)

## 🛡 Disclaimer

This project is intended for educational and development use only. Always safeguard your private keys and never expose sensitive credentials in your codebase or version control.
