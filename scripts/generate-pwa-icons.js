const sharp = require("sharp");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const icons = [
  { input: "icon-192x192.svg", output: "icon-192x192.png", width: 192, height: 192 },
  { input: "icon-512x512.svg", output: "icon-512x512.png", width: 512, height: 512 },
];

async function generateIcons() {
  for (const icon of icons) {
    const inputPath = path.join(PUBLIC_DIR, icon.input);
    const outputPath = path.join(PUBLIC_DIR, icon.output);

    await sharp(inputPath)
      .resize(icon.width, icon.height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outputPath);

    console.log(`Generated ${icon.output}`);
  }
}

generateIcons().catch((err) => {
  console.error(err);
  process.exit(1);
});
