import type { Surface } from "../../render/color/color.types.ts";
import { readPixel, toLinear, toSrgb, writePixel } from "./buffer/buffer.ts";

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type EffectFn = (source: Surface, destination: Surface) => void;

function splitColor(source: Surface, x: number, y: number): Rgb {
  const left = toSrgb(readPixel(source, x - 2, y));
  const middle = toSrgb(readPixel(source, x, y));
  const right = toSrgb(readPixel(source, x + 2, y));
  return toLinear({ r: left.r, g: middle.g, b: right.b });
}

export const split: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      writePixel(destination, x, y, splitColor(source, x, y));
    }
  }
};
