import { readPixel, toLinear, toSrgb, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

export const split: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const left = toSrgb(readPixel(source, x - 2, y));
      const middle = toSrgb(readPixel(source, x, y));
      const right = toSrgb(readPixel(source, x + 2, y));
      writePixel(
        destination,
        x,
        y,
        toLinear({ r: left.r, g: middle.g, b: right.b }),
      );
    }
  }
};
