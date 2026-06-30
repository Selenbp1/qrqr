const { sendJson, sendRedirect, getTargetUrl } = require("./_lib/http");

module.exports = (_req, res) => {
  const target = getTargetUrl();

  if (!target) {
    sendJson(res, 500, {
      error: "TARGET_URL is not set or invalid. Set it in Vercel Environment Variables.",
    });
    return;
  }

  sendRedirect(res, 302, target);
};
