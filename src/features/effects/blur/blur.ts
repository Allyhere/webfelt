import { createSurface } from "../../../render/color/color.ts";
import type { Surface } from "../../../render/color/color.types.ts";
import { readPixel, writePixel } from "../buffer/buffer.ts";

const SIGMA = 0.9;

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type EffectFn = (source: Surface, destination: Surface) => void;

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

function blurredPixel(
  source: Surface,
  x: number,
  y: number,
  horizontal: boolean,
  kernel: number[],
  radius: number,
): Rgb {
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
  return { r: red, g: green, b: blue };
}

function blurAxis(source: Surface, destination: Surface, horizontal: boolean): void {
  const kernel = weights();
  const radius = (kernel.length - 1) / 2;
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      writePixel(
        destination,
        x,
        y,
        blurredPixel(source, x, y, horizontal, kernel, radius),
      );
    }
  }
}

export const blur: EffectFn = (source, destination) => {
  const temp = createSurface(source.width, source.height);
  blurAxis(source, temp, true);
  blurAxis(temp, destination, false);
};
