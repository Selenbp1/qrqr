const { getConfig } = require("./landing-config");

module.exports = (_req, res) => {
  const config = getConfig();
  const links = {};
  for (const link of config.links) {
    links[link.label] = link.href;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      status: "ok",
      mode: "landing",
      landingMode: process.env.LANDING_MODE?.trim() || "brochure",
      title: config.title,
      heading: config.heading,
      links,
    })
  );
};
