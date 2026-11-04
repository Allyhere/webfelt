import { createSurface, type Surface } from "../../color.ts";
import { readPixel, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

const SIGMA = 0.9;

function weights(): number[] {
  const radius = Math.ceil(SIGMA * 2);
  const values: number[] = [];
  let sum = 0;
  for (let offset = -radius; offset <= radius; offset += 1) {
    const weight = Math.exp(-(offset * offset) / (2 * SIGMA * SIGMA));
    values.push(weight);
    sum += weight;
  }
  return values.map((weight) => weight / sum);
}

function blurAxis(source: Surface, destination: Surface, horizontal: boolean): void {
  const kernel = weights();
  const radius = (kernel.length - 1) / 2;
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      for (let offset = -radius; offset <= radius; offset += 1) {
        const pixel = readPixel(
          source,
          horizontal ? x + offset : x,
          horizontal ? y : y + offset,
        );
        const weight = kernel[offset + radius];
        red += pixel.r * weight;
        green += pixel.g * weight;
        blue += pixel.b * weight;
      }
      writePixel(destination, x, y, { r: red, g: green, b: blue });
    }
  }
}

export const blur: EffectFn = (source, destination) => {
  const temp = createSurface(source.width, source.height);
  blurAxis(source, temp, true);
  blurAxis(temp, destination, false);
};
