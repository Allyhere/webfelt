import { readPixel, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

const KERNEL = [-1, -1, 0, -1, 1, 1, 0, 1, 1];
const MIX = 0.65;

export const emboss: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let index = 0;
      for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          const pixel = readPixel(source, x + offsetX, y + offsetY);
          const weight = KERNEL[index];
          red += pixel.r * weight;
          green += pixel.g * weight;
          blue += pixel.b * weight;
          index += 1;
        }
      }
      const original = readPixel(source, x, y);
      writePixel(destination, x, y, {
        r: original.r * (1 - MIX) + red * MIX,
        g: original.g * (1 - MIX) + green * MIX,
        b: original.b * (1 - MIX) + blue * MIX,
      });
    }
  }
};
