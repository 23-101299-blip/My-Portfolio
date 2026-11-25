// One-off helper: merges multi-layer Figma icon exports into single SVG files.
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'public', 'assets');
const inner = (file, prefix) => {
  let s = fs.readFileSync(path.join(dir, file), 'utf8');
  s = s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return s.replace(/id="([^"]+)"/g, `id="${prefix}$1"`).replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`);
};
const wrap = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">\n${body}\n</svg>\n`;

// VS Code: 4 stacked layers of identical size.
const vs = [1, 2, 3, 4].map((i) => `<g>${inner(`icons/vscode-${i}.svg`, `vs${i}-`)}</g>`).join('\n');
fs.writeFileSync(path.join(dir, 'icons/vscode.svg'), wrap(39.8444, 39.9509, vs));

// FamBam logo: 8 letter parts positioned as in Figma.
const pos = [[114.532, 33.19], [56.407, 33.209], [212.19, 6.024], [0, 0], [359.635, 33.19], [301.502, 33.209], [452.835, 122.66], [449.521, 120.073]];
const fb = pos.map(([x, y], i) => `<g transform="translate(${x} ${y})">${inner(`logos/fambam-${i + 1}.svg`, `fb${i}-`)}</g>`).join('\n');
fs.writeFileSync(path.join(dir, 'logos/fambam.svg'), wrap(460.149, 131.77, fb));
console.log('merged');
