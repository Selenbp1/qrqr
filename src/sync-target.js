const fs = require("fs");
const path = require("path");
require("dotenv").config();

const target = process.env.TARGET_URL;
if (!target) {
  console.error("TARGET_URL is not set in .env");
  process.exit(1);
}

const output = path.join(__dirname, "..", "deploy", "go", "target.txt");
fs.writeFileSync(output, target.trim() + "\n", "utf8");
console.log(`Synced TARGET_URL to ${output}`);
console.log(target);
