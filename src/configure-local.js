const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

require("dotenv").config();

const projectRoot = path.join(__dirname, "..");
const envPath = path.join(projectRoot, ".env");
const port = process.env.PORT || "3000";
const node = process.execPath;

function getLanIp() {
  for (const interfaces of Object.values(os.networkInterfaces())) {
    for (const net of interfaces) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "127.0.0.1";
}

const host = process.env.PUBLIC_HOST || getLanIp();
const publicUrl = `http://${host}:${port}`;

let content = fs.readFileSync(envPath, "utf8");
if (/^PUBLIC_URL=/m.test(content)) {
  content = content.replace(/^PUBLIC_URL=.*$/m, `PUBLIC_URL=${publicUrl}`);
} else {
  content += `\nPUBLIC_URL=${publicUrl}\n`;
}
fs.writeFileSync(envPath, content);

console.log(`PUBLIC_URL = ${publicUrl}`);
console.log("Regenerating QR...");
execSync(`"${node}" src/generate-qr.js`, {
  cwd: projectRoot,
  stdio: "inherit",
});

console.log("");
console.log("Same Wi-Fi: scan QR or open the URL above.");
console.log("Business cards: set PUBLIC_HOST in .env to your public IP, then run this again.");
console.log("Also forward router port", port, "to this PC.");
