// Converts the PNG exports from Figma into small WebP files for the website.
// Originals are kept in /design-originals (not shipped with the site).
// Run with: npm run optimize-images
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '..', 'public', 'assets', 'img');
const originalsDir = path.join(__dirname, '..', 'design-originals');
const MAX_WIDTH = 1400;

(async () => {
  fs.mkdirSync(originalsDir, { recursive: true });
  const files = fs.readdirSync(imgDir).filter((f) => f.endsWith('.png'));
  for (const file of files) {
    const src = path.join(imgDir, file);
    const out = path.join(imgDir, file.replace(/\.png$/, '.webp'));
    const meta = await sharp(src).metadata();
    await sharp(src)
      .resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    fs.renameSync(src, path.join(originalsDir, file));
    const before = (fs.statSync(path.join(originalsDir, file)).size / 1024).toFixed(0);
    const after = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`${file}: ${meta.width}x${meta.height}  ${before} KB -> ${after} KB`);
  }
})();
