module.exports = (_req, res) => {
  res.json({
    status: "ok",
    target: process.env.TARGET_URL || null,
  });
};
