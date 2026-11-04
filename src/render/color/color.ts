import type { Rgba } from "../render.types.ts";
import type { LinearColor, Surface } from "./color.types.ts";

export function srgbUnitToLinear(channel: number): number {
  if (channel <= 0.04045) return channel / 12.92;
  return ((channel + 0.055) / 1.055) ** 2.4;
}

export function linearToSrgbUnit(channel: number): number {
  const corrected =
    channel <= 0.0031308
      ? channel * 12.92
      : 1.055 * channel ** (1 / 2.4) - 0.055;
  return Math.min(1, Math.max(0, corrected));
}

export function rgbaToLinear(color: Rgba): LinearColor {
  return {
    r: srgbUnitToLinear(color.r / 255),
    g: srgbUnitToLinear(color.g / 255),
    b: srgbUnitToLinear(color.b / 255),
    a: color.a,
  };
}

export function srgbUnitsToLinear(
  red: number,
  green: number,
  blue: number,
): LinearColor {
  return {
    r: srgbUnitToLinear(red),
    g: srgbUnitToLinear(green),
    b: srgbUnitToLinear(blue),
    a: 1,
  };
}

function linearChannelToSrgb(channel: number): number {
  return Math.min(255, Math.max(0, Math.floor(linearToSrgbUnit(channel) * 255)));
}

export function createSurface(width: number, height: number): Surface {
  return {
    width,
    height,
    data: new Float32Array(width * height * 3),
  };
}

function isOutsideSurface(surface: Surface, x: number, y: number): boolean {
  return x < 0 || y < 0 || x >= surface.width || y >= surface.height;
}

export function drawPixel(
  surface: Surface,
  x: number,
  y: number,
  color: LinearColor,
): void {
  if (color.a <= 0) return;
  if (isOutsideSurface(surface, x, y)) return;
  const index = (y * surface.width + x) * 3;
  const keep = 1 - color.a;
  const data = surface.data;
  data[index] = data[index] * keep + color.r * color.a;
  data[index + 1] = data[index + 1] * keep + color.g * color.a;
  data[index + 2] = data[index + 2] * keep + color.b * color.a;
}

export function toImageData(surface: Surface): ImageData {
  const { width, height, data } = surface;
  const pixels = new Uint8ClampedArray(width * height * 4);
  for (let index = 0; index < width * height; index += 1) {
    const source = index * 3;
    const target = index * 4;
    pixels[target] = linearChannelToSrgb(data[source]);
    pixels[target + 1] = linearChannelToSrgb(data[source + 1]);
    pixels[target + 2] = linearChannelToSrgb(data[source + 2]);
    pixels[target + 3] = 255;
  }
  return new ImageData(pixels, width, height);
}
