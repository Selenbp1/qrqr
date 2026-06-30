require("dotenv").config({ override: true });

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_URL = process.env.PUBLIC_URL;
const TARGET_URL = process.env.TARGET_URL;

if (!PUBLIC_URL) {
  console.error("PUBLIC_URL is required in .env");
  process.exit(1);
}

if (!TARGET_URL) {
  console.error("TARGET_URL is required in .env");
  process.exit(1);
}

module.exports = { PORT, HOST, PUBLIC_URL, TARGET_URL };
