require("dotenv").config({ override: true });

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const PUBLIC_URL_1 = process.env.PUBLIC_URL_1?.trim();
const PUBLIC_URL_2 = process.env.PUBLIC_URL_2?.trim();
const TARGET_URL_1 = process.env.TARGET_URL_1?.trim();
const TARGET_URL_2 = process.env.TARGET_URL_2?.trim();

function validateUrl(name, value) {
  if (!value) {
    console.error(`${name} is required in .env`);
    process.exit(1);
  }
  try {
    new URL(value);
  } catch {
    console.error(`${name} must be a valid URL`);
    process.exit(1);
  }
}

function requireTargets() {
  validateUrl("TARGET_URL_1", TARGET_URL_1);
  validateUrl("TARGET_URL_2", TARGET_URL_2);
}

function requirePublicUrls() {
  requireTargets();
  validateUrl("PUBLIC_URL_1", PUBLIC_URL_1);
  validateUrl("PUBLIC_URL_2", PUBLIC_URL_2);
}

module.exports = {
  PORT,
  HOST,
  PUBLIC_URL_1,
  PUBLIC_URL_2,
  TARGET_URL_1,
  TARGET_URL_2,
  requireTargets,
  requirePublicUrls,
};
