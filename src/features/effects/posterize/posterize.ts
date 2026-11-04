import type { Surface } from "../../../render/color/color.types.ts";
import { readPixel, toLinear, toSrgb, writePixel } from "../buffer/buffer.ts";

const STEPS = 3;

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type EffectFn = (source: Surface, destination: Surface) => void;

function step(channel: number): number {
  return Math.round(channel * STEPS) / STEPS;
}

function posterized(source: Surface, x: number, y: number): Rgb {
  const color = toSrgb(readPixel(source, x, y));
  return toLinear({ r: step(color.r), g: step(color.g), b: step(color.b) });
}

export const posterize: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      writePixel(destination, x, y, posterized(source, x, y));
    }
  }
};
