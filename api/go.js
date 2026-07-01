module.exports = (req, res) => {
  const target = process.env.TARGET_URL?.trim();

  if (!target) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        error: "TARGET_URL is not set in Vercel Environment Variables.",
      })
    );
    return;
  }

  try {
    new URL(target);
  } catch {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ error: "TARGET_URL is not a valid URL." }));
    return;
  }

  res.statusCode = 302;
  res.setHeader("Location", target);
  res.end();
};
