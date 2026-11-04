import { toImageData } from "../../../render/color/color.ts";
import { createGradientSurface } from "../../../render/gradient.ts";
import { drawSvgPattern } from "../../patterns/svgPattern/svgPattern.ts";
import type { Rgb, Rgba } from "../../../render/render.types.ts";
import { applyEffect } from "../applyEffects.ts";

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
