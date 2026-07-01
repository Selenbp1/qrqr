module.exports = (_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      status: "ok",
      target:
        process.env.TARGET_URL?.trim() ||
        process.env.TARGET_URL_1?.trim() ||
        process.env.TARGET_URL_2?.trim() ||
        null,
      TARGET_URL: process.env.TARGET_URL?.trim() || null,
      TARGET_URL_1: process.env.TARGET_URL_1?.trim() || null,
      TARGET_URL_2: process.env.TARGET_URL_2?.trim() || null,
    })
  );
};
