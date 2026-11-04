import { readPixel, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

const BLOCK = 4;

export const pixelate: EffectFn = (source, destination) => {
  for (let y0 = 0; y0 < source.height; y0 += BLOCK) {
    for (let x0 = 0; x0 < source.width; x0 += BLOCK) {
      fillBlock(source, destination, x0, y0);
    }
  }
};

function fillBlock(
  source: Parameters<EffectFn>[0],
  destination: Parameters<EffectFn>[1],
  x0: number,
  y0: number,
): void {
  const x1 = Math.min(source.width, x0 + BLOCK);
  const y1 = Math.min(source.height, y0 + BLOCK);
  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const pixel = readPixel(source, x, y);
      red += pixel.r;
      green += pixel.g;
      blue += pixel.b;
      count += 1;
    }
  }
  const color = { r: red / count, g: green / count, b: blue / count };
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) writePixel(destination, x, y, color);
  }
}
