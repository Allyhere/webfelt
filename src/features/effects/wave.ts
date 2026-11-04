import type { Surface } from "../../render/color/color.types.ts";
import { readPixel, writePixel } from "./buffer/buffer.ts";

type EffectFn = (source: Surface, destination: Surface) => void;

function waveShift(y: number): number {
  return Math.round(Math.sin((y / 6) * Math.PI * 2) * 2);
}

export const wave: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    const shift = waveShift(y);
    for (let x = 0; x < source.width; x += 1) {
      writePixel(destination, x, y, readPixel(source, x - shift, y));
    }
  }
};
