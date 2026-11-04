import { readPixel, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

const SAMPLES = 4;

export const motionBlur: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      for (let sample = 0; sample < SAMPLES; sample += 1) {
        const pixel = readPixel(source, x - sample, y);
        red += pixel.r;
        green += pixel.g;
        blue += pixel.b;
      }
      writePixel(destination, x, y, {
        r: red / SAMPLES,
        g: green / SAMPLES,
        b: blue / SAMPLES,
      });
    }
  }
};
