const crypto = require("crypto");

function hashData(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

class Block {
  constructor(index, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = new Date().toISOString();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const data = this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce;
    return hashData(data);
  }

  mineBlock(difficulty) {
    const target = "0".repeat(difficulty);
    const startTime = Date.now();

    while (!this.hash.startsWith(target)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    const endTime = Date.now();
    const seconds = ((endTime - startTime) / 1000).toFixed(2);

    console.log(`\n\n ✅ Block mined: ${this.hash}`);
    console.log(`⏱️ Mining took ${seconds} seconds`);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
  }

  createGenesisBlock() {
    return new Block(0, ["Genesis Block"], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(transactions) {
    const newBlock = new Block(this.chain.length, transactions, this.getLatestBlock().hash);
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    const target = "0".repeat(this.difficulty);

    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) return false;

      if (current.previousHash !== previous.hash) return false;

      if (!current.hash.startsWith(target)) return false;
    }
    return true;
  }
}

const myBlockchain = new Blockchain();

myBlockchain.addBlock(["Alice pays Bob 10 BTC"]);
myBlockchain.addBlock(["Eve pays Frank 5 BTC"]);
myBlockchain.addBlock(["Jim pays Alice 10 BTC"]);

console.log("\n\n\n --- ORIGINAL BLOCKCHAIN ---", "\n", JSON.stringify(myBlockchain, null, 2));

console.log("\n• Number of blocks on chain:", myBlockchain.chain.length, "\n");

console.log("• Is blockchain valid?", myBlockchain.isChainValid(), "\n\n\n");

const blockNumber = 2;
myBlockchain.chain[blockNumber].transactions = "I am tampered with";
myBlockchain.chain[blockNumber].hash = myBlockchain.chain[blockNumber].calculateHash();

for (let i = blockNumber + 1; i < myBlockchain.chain.length; i++) {
  myBlockchain.chain[i].previousHash = myBlockchain.chain[i - 1].hash;
  myBlockchain.chain[i].hash = myBlockchain.chain[i].calculateHash();
}

console.log("--- MODIFIED BLOCKCHAIN ---", "\n", JSON.stringify(myBlockchain, null, 2));

console.log("\n• Number of blocks on chain:", myBlockchain.chain.length, "\n");

console.log("• Is blockchain valid after tampering?", myBlockchain.isChainValid(), "\n\n\n");
