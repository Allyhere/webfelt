import { clampChannel, readPixel, writePixel } from "../buffer.ts";
import { hashUnit } from "../hash.ts";
import type { EffectFn } from "../types.ts";

export const grain: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const pixel = readPixel(source, x, y);
      const noise = (hashUnit(x, y, 3) - 0.5) * 0.35;
      writePixel(destination, x, y, {
        r: clampChannel(pixel.r + noise),
        g: clampChannel(pixel.g + noise),
        b: clampChannel(pixel.b + noise),
      });
    }
  }
};
