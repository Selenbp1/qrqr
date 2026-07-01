module.exports = (_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      status: "ok",
      target: process.env.TARGET_URL?.trim() || null,
    })
  );
};
