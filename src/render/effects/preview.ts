import { toImageData } from "../color.ts";
import { createGradientSurface } from "../gradient.ts";
import { drawSvgPattern } from "../svgPattern.ts";
import type { Rgb, Rgba } from "../types.ts";
import { applyEffect } from "./index.ts";

const SAMPLE_SIZE = 48;

export function renderEffectSample(
  svg: string,
  top: Rgb,
  bottom: Rgb,
  color: Rgba,
  spacing: number,
  flip: boolean,
  effectId: string,
): ImageData {
  const surface = createGradientSurface(SAMPLE_SIZE, SAMPLE_SIZE, top, bottom);
  drawSvgPattern(surface, svg, { ...color, a: 1 }, spacing, flip);
  applyEffect(surface, effectId);
  return toImageData(surface);
}
