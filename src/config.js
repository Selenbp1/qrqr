require("dotenv").config({ override: true });

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const TARGET_URL = process.env.TARGET_URL?.trim();
const PUBLIC_URL = process.env.PUBLIC_URL?.trim();

function requireTargetUrl() {
  if (!TARGET_URL) {
    console.error("TARGET_URL is required in .env");
    process.exit(1);
  }
  try {
    new URL(TARGET_URL);
  } catch {
    console.error("TARGET_URL must be a valid URL");
    process.exit(1);
  }
}

function requirePublicUrl() {
  requireTargetUrl();
  if (!PUBLIC_URL) {
    console.error("PUBLIC_URL is required in .env");
    process.exit(1);
  }
  try {
    new URL(PUBLIC_URL);
  } catch {
    console.error("PUBLIC_URL must be a valid URL");
    process.exit(1);
  }
}

module.exports = {
  PORT,
  HOST,
  PUBLIC_URL,
  TARGET_URL,
  requireTargetUrl,
  requirePublicUrl,
};
