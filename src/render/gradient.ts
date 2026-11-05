import type { GradientAxis } from "./badge/badgeShape.types.ts";
import { createSurface, srgbUnitsToLinear } from "./color/color.ts";
import type { Surface } from "./color/color.types.ts";
import type { Rgb } from "./render.types.ts";

function fillGradient(
  surface: Surface,
  start: Rgb,
  end: Rgb,
  axis: GradientAxis,
): void {
  const { width, height, data } = surface;
  const horizontal = axis === "horizontal";
  const span = Math.max((horizontal ? width : height) - 1, 1);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const endWeight = (horizontal ? x : y) / span;
      const startWeight = 1 - endWeight;
      const color = srgbUnitsToLinear(
        (start.r * startWeight + end.r * endWeight) / 255,
        (start.g * startWeight + end.g * endWeight) / 255,
        (start.b * startWeight + end.b * endWeight) / 255,
      );
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
  axis: GradientAxis = "vertical",
): Surface {
  const surface = createSurface(width, height);
  fillGradient(surface, top, bottom, axis);
  return surface;
}
