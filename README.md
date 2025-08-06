# ⛓️ Simple Proof-of-Work Blockchain in JavaScript

A clean, educational implementation of a blockchain from scratch using **Node.js** and the built-in `crypto` module.  
This project demonstrates **how blockchains work under the hood** — including block mining, hashing, proof-of-work, chain validation, and tampering detection.

---

## 🚀 Features

- **Genesis Block Creation** – Initializes the chain with a starting block.
- **Proof-of-Work Mining** – Uses adjustable difficulty to control mining speed.
- **SHA-256 Hashing** – Ensures block data integrity.
- **Chain Validation** – Detects tampering instantly.
- **Tampering Demonstration** – Shows how altering data invalidates the chain.
- **Readable Output** – Clear logs for mining, timing, and chain status.

---

## 📜 How It Works

### 1️⃣ Creating Blocks

Each block stores:

- Index
- Timestamp
- Transactions
- Previous block’s hash
- Nonce (for mining)
- Current block hash

```js
class Block {
  constructor(index, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = new Date().toISOString();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }
}
```

2️⃣ Proof-of-Work Mining
Blocks are mined until the hash starts with a specific number of leading zeros.

```js
mineBlock(difficulty) {
  const target = "0".repeat(difficulty);
  while (!this.hash.startsWith(target)) {
    this.nonce++;
    this.hash = this.calculateHash();
  }
}
```

3️⃣ Adding to the Chain
Each new block references the hash of the previous block, ensuring the chain's integrity.

```js
addBlock(transactions) {
  const newBlock = new Block(this.chain.length, transactions, this.getLatestBlock().hash);
  newBlock.mineBlock(this.difficulty);
  this.chain.push(newBlock);
}
```

4️⃣ Tampering Demonstration
We intentionally modify block data to show how the blockchain detects invalid changes — even if all following blocks are recalculated.

🖥 Example Output

```vbnet
✅ Block mined: 000ac8b2f...
⏱️ Mining took 0.83 seconds
...
• Is blockchain valid? true

--- MODIFIED BLOCKCHAIN ---
• Is blockchain valid after tampering? false
```

🔧 Running the Project
Prerequisites:

Node.js (v18+ recommended)

Install & Run:

```bash
git clone https://github.com/eatcodebuild/blockchain-fundamentals.git
cd blockchain-fundamentals
node blockchain.js
```

🎯 Why This Project Exists
This isn’t a production-ready blockchain — it’s a learning tool.
It’s perfect for:

Developers new to blockchain concepts.

Interview discussion and portfolio showcase.

Explaining immutability, proof-of-work, and hash chaining in a tangible way.



📌 Key Takeaways
Blockchains are secure by design because altering one block requires re-mining all subsequent blocks.

Proof-of-work slows down malicious actors by making block creation computationally expensive.

Tampering is easily detected with chain validation logic.

📬 Connect with Me
💻 GitHub: /eatcodebuild
💼 LinkedIn: /ryan-jeffrey-b21327247
