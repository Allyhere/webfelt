import type { Surface } from "../../../render/color/color.types.ts";
import { readPixel, writePixel } from "../buffer/buffer.ts";

const BLOCK = 4;

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type EffectFn = (source: Surface, destination: Surface) => void;

function averageBlock(source: Surface, x0: number, y0: number): Rgb {
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
  return { r: red / count, g: green / count, b: blue / count };
}

function fillBlock(
  destination: Surface,
  x0: number,
  y0: number,
  color: Rgb,
): void {
  const x1 = Math.min(destination.width, x0 + BLOCK);
  const y1 = Math.min(destination.height, y0 + BLOCK);
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) writePixel(destination, x, y, color);
  }
}

export const pixelate: EffectFn = (source, destination) => {
  for (let y0 = 0; y0 < source.height; y0 += BLOCK) {
    for (let x0 = 0; x0 < source.width; x0 += BLOCK) {
      fillBlock(destination, x0, y0, averageBlock(source, x0, y0));
    }
  }
};
