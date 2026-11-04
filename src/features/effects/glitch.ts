import type { Surface } from "../../render/color/color.types.ts";
import { readPixel, writePixel } from "./buffer/buffer.ts";
import { hashUnit } from "./hash/hash.ts";

type EffectFn = (source: Surface, destination: Surface) => void;

function bandOffset(band: number): number {
  return Math.round((hashUnit(band, 0, 7) - 0.5) * 8);
}

function bandEnd(band: number, bandCount: number, height: number, bandHeight: number): number {
  if (band === bandCount - 1) return height;
  return Math.floor((band + 1) * bandHeight);
}

export const glitch: EffectFn = (source, destination) => {
  const bandCount = 3;
  const bandHeight = source.height / bandCount;
  for (let band = 0; band < bandCount; band += 1) {
    const offset = bandOffset(band);
    const start = Math.floor(band * bandHeight);
    const end = bandEnd(band, bandCount, source.height, bandHeight);
    for (let y = start; y < end; y += 1) {
      for (let x = 0; x < source.width; x += 1) {
        writePixel(destination, x, y, readPixel(source, x - offset, y));
      }
    }
  }
};
