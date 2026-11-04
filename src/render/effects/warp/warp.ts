import { hashUnit } from "../hash.ts";
import { sampleBilinear, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

const SCALE = 6;

function fade(amount: number): number {
  return amount * amount * (3 - 2 * amount);
}

function noise(x: number, y: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = fade(x - x0);
  const ty = fade(y - y0);
  const topLeft = hashUnit(x0, y0, seed);
  const topRight = hashUnit(x0 + 1, y0, seed);
  const bottomLeft = hashUnit(x0, y0 + 1, seed);
  const bottomRight = hashUnit(x0 + 1, y0 + 1, seed);
  const top = topLeft + (topRight - topLeft) * tx;
  const bottom = bottomLeft + (bottomRight - bottomLeft) * tx;
  return top + (bottom - top) * ty;
}

export const warp: EffectFn = (source, destination) => {
  const frequency = 0.15;
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const horizontal =
        noise(x * frequency, y * frequency, 1) * 0.7 +
        noise(x * frequency * 2, y * frequency * 2, 2) * 0.3;
      const vertical =
        noise(x * frequency, y * frequency, 3) * 0.7 +
        noise(x * frequency * 2, y * frequency * 2, 4) * 0.3;
      writePixel(
        destination,
        x,
        y,
        sampleBilinear(
          source,
          x + SCALE * (horizontal - 0.5),
          y + SCALE * (vertical - 0.5),
        ),
      );
    }
  }
};
