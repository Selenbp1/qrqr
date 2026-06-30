const http = require("http");
const redirect = require("../api/redirect");
const health = require("../api/health");

process.env.TARGET_URL = process.env.TARGET_URL || "http://www.solux.co.kr/kor/";

function mockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    end(body) {
      this.body = body || "";
    },
  };
}

function run(name, handler) {
  const res = mockRes();
  handler({}, res);
  console.log(`${name}: ${res.statusCode} ${res.headers.location || res.body}`);
}

run("redirect", redirect);
run("health", health);
