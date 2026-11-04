import type { Surface } from "../../../render/color/color.types.ts";
import { readPixel, writePixel } from "../buffer/buffer.ts";

const SAMPLES = 4;

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type EffectFn = (source: Surface, destination: Surface) => void;

function motionColor(source: Surface, x: number, y: number): Rgb {
  let red = 0;
  let green = 0;
  let blue = 0;
  for (let sample = 0; sample < SAMPLES; sample += 1) {
    const pixel = readPixel(source, x - sample, y);
    red += pixel.r;
    green += pixel.g;
    blue += pixel.b;
  }
  return { r: red / SAMPLES, g: green / SAMPLES, b: blue / SAMPLES };
}

export const motionBlur: EffectFn = (source, destination) => {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      writePixel(destination, x, y, motionColor(source, x, y));
    }
  }
};
