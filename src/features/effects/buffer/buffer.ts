import { createSurface, linearToSrgbUnit, srgbUnitToLinear } from "../../../render/color/color.ts";
import type { Surface } from "../../../render/color/color.types.ts";

type Rgb = {
  r: number;
  g: number;
  b: number;
};

export function copySurface(source: Surface): Surface {
  const copy = createSurface(source.width, source.height);
  copy.data.set(source.data);
  return copy;
}

export function readPixel(source: Surface, x: number, y: number): Rgb {
  const clampedX = Math.min(source.width - 1, Math.max(0, x));
  const clampedY = Math.min(source.height - 1, Math.max(0, y));
  const index = (clampedY * source.width + clampedX) * 3;
  return {
    r: source.data[index],
    g: source.data[index + 1],
    b: source.data[index + 2],
  };
}

export function writePixel(
  destination: Surface,
  x: number,
  y: number,
  color: Rgb,
): void {
  const index = (y * destination.width + x) * 3;
  destination.data[index] = color.r;
  destination.data[index + 1] = color.g;
  destination.data[index + 2] = color.b;
}

function mix(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

export function sampleBilinear(source: Surface, x: number, y: number): Rgb {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = x - x0;
  const ty = y - y0;
  const topLeft = readPixel(source, x0, y0);
  const topRight = readPixel(source, x0 + 1, y0);
  const bottomLeft = readPixel(source, x0, y0 + 1);
  const bottomRight = readPixel(source, x0 + 1, y0 + 1);
  return {
    r: mix(mix(topLeft.r, topRight.r, tx), mix(bottomLeft.r, bottomRight.r, tx), ty),
    g: mix(mix(topLeft.g, topRight.g, tx), mix(bottomLeft.g, bottomRight.g, tx), ty),
    b: mix(mix(topLeft.b, topRight.b, tx), mix(bottomLeft.b, bottomRight.b, tx), ty),
  };
}

export function toSrgb(color: Rgb): Rgb {
  return {
    r: linearToSrgbUnit(color.r),
    g: linearToSrgbUnit(color.g),
    b: linearToSrgbUnit(color.b),
  };
}

export function toLinear(color: Rgb): Rgb {
  return {
    r: srgbUnitToLinear(color.r),
    g: srgbUnitToLinear(color.g),
    b: srgbUnitToLinear(color.b),
  };
}
