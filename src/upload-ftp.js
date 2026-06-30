const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.ftp") });

const { Client } = require("basic-ftp");

const required = ["FTP_HOST", "FTP_USER", "FTP_PASS"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing ${key} in .env.ftp`);
    console.error("Copy .env.ftp.example to .env.ftp and fill in your Winko FTP details.");
    process.exit(1);
  }
}

const localDir = path.join(__dirname, "..", "deploy", "go");

async function listDir(client, dir) {
  try {
    await client.cd(dir);
    return await client.list();
  } catch {
    return null;
  }
}

async function findWebRoot(client) {
  const queue = ["/"];
  const visited = new Set();

  while (queue.length > 0) {
    const dir = queue.shift();
    if (visited.has(dir)) continue;
    visited.add(dir);

    const items = await listDir(client, dir);
    if (!items) continue;

    if (items.some((item) => item.name === "kor" && item.isDirectory)) {
      return dir;
    }

    for (const item of items) {
      if (!item.isDirectory) continue;
      if ([".", ".."].includes(item.name)) continue;
      queue.push(dir === "/" ? `/${item.name}` : `${dir}/${item.name}`);
    }
  }

  return null;
}

async function upload() {
  const client = new Client(30000);
  client.ftp.verbose = process.env.FTP_VERBOSE === "1";

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
      port: Number(process.env.FTP_PORT || 21),
      secure: process.env.FTP_SECURE === "1",
    });

    let webRoot = process.env.FTP_WEB_ROOT;
    if (!webRoot) {
      console.log("Searching for web root (kor folder)...");
      webRoot = await findWebRoot(client);
      if (!webRoot) {
        throw new Error(
          "kor folder not found on FTP. Set FTP_WEB_ROOT in .env.ftp manually."
        );
      }
      console.log(`Found web root: ${webRoot}`);
    }

    const remoteGo = `${webRoot.replace(/\/$/, "")}/go`;
    await client.ensureDir(remoteGo);
    await client.cd(remoteGo);
    await client.clearWorkingDir();

    const files = fs.readdirSync(localDir);
    for (const file of files) {
      const localPath = path.join(localDir, file);
      if (fs.statSync(localPath).isFile()) {
        await client.uploadFrom(localPath, file);
        console.log(`  uploaded ${file}`);
      }
    }

    console.log("");
    console.log("Done. Test in browser:");
    console.log("  http://www.solux.co.kr/go");
  } finally {
    client.close();
  }
}

upload().catch((err) => {
  console.error("Upload failed:", err.message);
  process.exit(1);
});
