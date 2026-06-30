function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function sendRedirect(res, statusCode, location) {
  res.statusCode = statusCode;
  res.setHeader("Location", location);
  res.end();
}

function getTargetUrl() {
  const target = process.env.TARGET_URL?.trim();
  if (!target) return null;

  try {
    new URL(target);
    return target;
  } catch {
    return null;
  }
}

module.exports = { sendJson, sendRedirect, getTargetUrl };
