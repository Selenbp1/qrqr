const express = require("express");
const path = require("path");
const {
  PORT,
  HOST,
  PUBLIC_URL,
  TARGET_URL,
  requireTargetUrl,
} = require("./config");

requireTargetUrl();

const app = express();

function redirectToTarget(_req, res) {
  res.redirect(302, TARGET_URL);
}

app.get("/", redirectToTarget);
app.get("/go", redirectToTarget);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", target: TARGET_URL });
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(PORT, HOST, () => {
  console.log(`Redirect server running on http://${HOST}:${PORT}`);
  console.log(`Public URL (QR): ${PUBLIC_URL}`);
  console.log(`Target URL:        ${TARGET_URL}`);
});
