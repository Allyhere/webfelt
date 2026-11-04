import type { Surface } from "../../render/color/color.types.ts";
import { readPixel, writePixel } from "./buffer/buffer.ts";
import { hashUnit } from "./hash/hash.ts";

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type EffectFn = (source: Surface, destination: Surface) => void;

function grained(pixel: Rgb, x: number, y: number): Rgb {
  const noise = (hashUnit(x, y, 3) - 0.5) * 0.35;
  return {
    r: Math.min(1, Math.max(0, pixel.r + noise)),
    g: Math.min(1, Math.max(0, pixel.g + noise)),
    b: Math.min(1, Math.max(0, pixel.b + noise)),
  };
}

export const grain: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      writePixel(destination, x, y, grained(readPixel(source, x, y), x, y));
    }
  }
};
