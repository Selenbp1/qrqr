const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { PUBLIC_URL, requirePublicUrl } = require("./config");

requirePublicUrl();

const outputDir = path.join(__dirname, "..", "public");
const outputPath = path.join(outputDir, "qr.png");

async function generate() {
  fs.mkdirSync(outputDir, { recursive: true });

  await QRCode.toFile(outputPath, PUBLIC_URL, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
  });

  console.log(`QR code generated: ${outputPath}`);
  console.log(`Encoded URL: ${PUBLIC_URL}`);
}

generate().catch((err) => {
  console.error("Failed to generate QR code:", err.message);
  process.exit(1);
});
