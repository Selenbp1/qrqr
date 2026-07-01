module.exports = (_req, res) => {
  const target =
    process.env.TARGET_URL?.trim() ||
    process.env.TARGET_URL_1?.trim() ||
    process.env.TARGET_URL_2?.trim() ||
    null;

  if (!target) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        error:
          "Set TARGET_URL (or TARGET_URL_1 / TARGET_URL_2) in Vercel Environment Variables.",
      })
    );
    return;
  }

  try {
    new URL(target);
  } catch {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "Target URL is invalid." }));
    return;
  }

  res.statusCode = 302;
  res.setHeader("Location", target);
  res.end();
};
