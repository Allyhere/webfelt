import { readPixel, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

export const wave: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    const shift = Math.round(Math.sin((y / 6) * Math.PI * 2) * 2);
    for (let x = 0; x < source.width; x += 1) {
      writePixel(destination, x, y, readPixel(source, x - shift, y));
    }
  }
};
