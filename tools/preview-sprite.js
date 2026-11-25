// Renders the pixel character frames to a PNG so they can be checked by eye.
// Run: node tools/preview-sprite.js  -> tools/preview-sprite.png
const sharp = require('sharp');
const sprite = require('../src/data/sprite.json');

const S = 12; // screen pixels per sprite pixel
const frames = Object.keys(sprite.body);
const rows = (f) => [...sprite.head, ...sprite.body[f]];
const w = 16, h = rows('idle').length, gap = 4;
const W = (w + gap) * frames.length * S, H = (h + 2) * S;
const buf = Buffer.alloc(W * H * 4, 0);
for (let i = 0; i < W * H; i++) buf.writeUInt32BE(0xddf3ffff, i * 4);

frames.forEach((f, fi) => {
  rows(f).forEach((row, y) => [...row].forEach((ch, x) => {
    const hex = sprite.palette[ch];
    if (!hex) return;
    const [r, g, b] = [1, 3, 5].map((o) => parseInt(hex.slice(o, o + 2), 16));
    for (let dy = 0; dy < S; dy++) for (let dx = 0; dx < S; dx++) {
      const px = (fi * (w + gap) + x) * S + dx, py = (y + 1) * S + dy;
      const o = (py * W + px) * 4; buf[o] = r; buf[o + 1] = g; buf[o + 2] = b; buf[o + 3] = 255;
    }
  }));
});
sharp(buf, { raw: { width: W, height: H, channels: 4 } }).png().toFile(__dirname + '/preview-sprite.png').then(() => console.log('ok'));
