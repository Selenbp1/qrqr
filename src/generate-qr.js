const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const { PUBLIC_URL_1, PUBLIC_URL_2, requirePublicUrls } = require("./config");

requirePublicUrls();

const outputDir = path.join(__dirname, "..", "public");

const qrItems = [
  { file: "qr1.png", url: PUBLIC_URL_1, label: "QR 1 (profile)" },
  { file: "qr2.png", url: PUBLIC_URL_2, label: "QR 2 (soq)" },
];

async function generate() {
  fs.mkdirSync(outputDir, { recursive: true });

  for (const item of qrItems) {
    const outputPath = path.join(outputDir, item.file);
    await QRCode.toFile(outputPath, item.url, {
      type: "png",
      width: 512,
      margin: 2,
      errorCorrectionLevel: "M",
    });
    console.log(`${item.label}: ${outputPath}`);
    console.log(`  -> ${item.url}`);
  }

  console.log("");
  console.log("Legacy single QR: public/qr.png (= qr1)");
  await QRCode.toFile(path.join(outputDir, "qr.png"), PUBLIC_URL_1, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}

generate().catch((err) => {
  console.error("Failed to generate QR codes:", err.message);
  process.exit(1);
});
