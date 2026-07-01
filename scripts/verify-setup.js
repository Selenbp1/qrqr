const https = require("https");
require("dotenv").config({ override: true });

const base = "https://qrqr-seven.vercel.app";

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () =>
          resolve({ status: res.statusCode, headers: res.headers, body })
        );
      })
      .on("error", reject);
  });
}

async function main() {
  console.log("PUBLIC_URL_1:", process.env.PUBLIC_URL_1);
  console.log("PUBLIC_URL_2:", process.env.PUBLIC_URL_2);
  console.log("");

  const health = await get(`${base}/health`);
  console.log("/health:", health.body);

  for (const n of [1, 2]) {
    const res = await get(`${base}/go${n}`);
    console.log(`/go${n}:`, res.status, "->", res.headers.location || res.body);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
