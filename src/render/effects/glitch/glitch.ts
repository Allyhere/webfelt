import { hashUnit } from "../hash.ts";
import { readPixel, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

export const glitch: EffectFn = (source, destination) => {
  const bandCount = 3;
  const bandHeight = source.height / bandCount;
  for (let band = 0; band < bandCount; band += 1) {
    const offset = Math.round((hashUnit(band, 0, 7) - 0.5) * 8);
    const start = Math.floor(band * bandHeight);
    const end =
      band === bandCount - 1
        ? source.height
        : Math.floor((band + 1) * bandHeight);
    for (let y = start; y < end; y += 1) {
      for (let x = 0; x < source.width; x += 1) {
        writePixel(destination, x, y, readPixel(source, x - offset, y));
      }
    }
  }
};
