const express = require("express");
const path = require("path");
const {
  PORT,
  HOST,
  PUBLIC_URL_1,
  PUBLIC_URL_2,
  TARGET_URL_1,
  TARGET_URL_2,
  requireTargets,
} = require("./config");

requireTargets();

const app = express();

function redirect(res, target) {
  res.redirect(302, target);
}

app.get("/go1", (_req, res) => redirect(res, TARGET_URL_1));
app.get("/go2", (_req, res) => redirect(res, TARGET_URL_2));
app.get("/go", (_req, res) => redirect(res, TARGET_URL_1));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", target1: TARGET_URL_1, target2: TARGET_URL_2 });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/docs", express.static(path.join(__dirname, "..", "docs")));

app.listen(PORT, HOST, () => {
  console.log(`Redirect server running on http://${HOST}:${PORT}`);
  console.log(`QR 1: ${PUBLIC_URL_1} -> ${TARGET_URL_1}`);
  console.log(`QR 2: ${PUBLIC_URL_2} -> ${TARGET_URL_2}`);
});
