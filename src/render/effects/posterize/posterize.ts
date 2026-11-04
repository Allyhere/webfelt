import { readPixel, toLinear, toSrgb, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

const STEPS = 3;

function step(channel: number): number {
  return Math.round(channel * STEPS) / STEPS;
}

export const posterize: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const color = toSrgb(readPixel(source, x, y));
      writePixel(
        destination,
        x,
        y,
        toLinear({ r: step(color.r), g: step(color.g), b: step(color.b) }),
      );
    }
  }
};
