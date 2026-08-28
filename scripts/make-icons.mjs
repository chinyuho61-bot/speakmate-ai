// Generates simple placeholder PWA icons (solid blue rounded square + "S" mark)
// using only Node's built-in zlib — no image-library dependency required.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve(new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"), "../client/public");
mkdirSync(OUT_DIR, { recursive: true });

const BLUE = [0x39, 0x7f, 0xee];
const WHITE = [0xff, 0xff, 0xff];

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

// Draws a rounded-square blue icon with a simple white "S" glyph made of rectangles.
function makePng(size) {
  const raw = Buffer.alloc((size * 3 + 1) * size);
  const radius = Math.round(size * 0.22);
  const isInsideRounded = (x, y) => {
    const cx = x < radius ? radius : x >= size - radius ? size - radius - 1 : x;
    const cy = y < radius ? radius : y >= size - radius ? size - radius - 1 : y;
    if (x >= radius && x < size - radius) return true;
    if (y >= radius && y < size - radius) return true;
    const dx = x - cx;
    const dy = y - cy;
    return dx * dx + dy * dy <= radius * radius;
  };

  // "S" glyph built from 3 horizontal bars + 2 verticals, scaled to icon size.
  const g = size / 100;
  const bars = [
    [22, 20, 78, 30], // top bar
    [22, 45, 78, 55], // middle bar
    [22, 70, 78, 80], // bottom bar
    [22, 20, 32, 50], // top-left vertical
    [68, 50, 78, 80], // bottom-right vertical
  ].map(([x1, y1, x2, y2]) => [x1 * g, y1 * g, x2 * g, y2 * g]);

  const isGlyph = (x, y) => bars.some(([x1, y1, x2, y2]) => x >= x1 && x < x2 && y >= y1 && y < y2);

  let offset = 0;
  for (let y = 0; y < size; y++) {
    raw[offset++] = 0; // filter type: none
    for (let x = 0; x < size; x++) {
      const inside = isInsideRounded(x, y);
      const [r, g_, b] = !inside ? [0xf5, 0xf8, 0xfd] : isGlyph(x, y) ? WHITE : BLUE;
      raw[offset++] = r;
      raw[offset++] = g_;
      raw[offset++] = b;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = deflateSync(raw);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

for (const size of [192, 512]) {
  const png = makePng(size);
  writeFileSync(path.join(OUT_DIR, `icon-${size}.png`), png);
  console.log(`wrote icon-${size}.png (${png.length} bytes)`);
}
