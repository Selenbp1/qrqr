module.exports = (req, res) => {
  const target = process.env.TARGET_URL;

  if (!target) {
    res.status(500).json({ error: "TARGET_URL is not set in Vercel environment variables" });
    return;
  }

  res.redirect(302, target);
};
