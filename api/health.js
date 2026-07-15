module.exports = (_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      status: "ok",
      mode: "landing",
      links: {
        B2B:
          process.env.LINK_B2B?.trim() ||
          "https://selenbp1.github.io/qrqr/b2b.pdf",
        B2G:
          process.env.LINK_B2G?.trim() ||
          "https://selenbp1.github.io/qrqr/b2g.pdf",
        B2C:
          process.env.LINK_B2C?.trim() ||
          "https://selenbp1.github.io/qrqr/b2c.pdf",
      },
      TARGET_URL: process.env.TARGET_URL?.trim() || null,
      TARGET_URL_1: process.env.TARGET_URL_1?.trim() || null,
      TARGET_URL_2: process.env.TARGET_URL_2?.trim() || null,
    })
  );
};
