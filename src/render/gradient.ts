import { createSurface, srgbUnitsToLinear, type Surface } from "./color.ts";
import type { Rgb } from "./types.ts";

export function fillVerticalGradient(
  surface: Surface,
  top: Rgb,
  bottom: Rgb,
): void {
  const { width, height, data } = surface;
  const span = Math.max(height - 1, 1);
  for (let y = 0; y < height; y += 1) {
    const endWeight = height === 1 ? 0 : y / span;
    const startWeight = 1 - endWeight;
    const color = srgbUnitsToLinear(
      (top.r * startWeight + bottom.r * endWeight) / 255,
      (top.g * startWeight + bottom.g * endWeight) / 255,
      (top.b * startWeight + bottom.b * endWeight) / 255,
    );
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 3;
      data[index] = color.r;
      data[index + 1] = color.g;
      data[index + 2] = color.b;
    }
  }
}

export function createGradientSurface(
  width: number,
  height: number,
  top: Rgb,
  bottom: Rgb,
): Surface {
  const surface = createSurface(width, height);
  fillVerticalGradient(surface, top, bottom);
  return surface;
}
