const { sendJson, getTargetUrl } = require("./_lib/http");

module.exports = (_req, res) => {
  sendJson(res, 200, {
    status: "ok",
    target: getTargetUrl(),
  });
};
