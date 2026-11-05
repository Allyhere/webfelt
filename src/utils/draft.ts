import { MAX_HEIGHT, MAX_WIDTH, SAMPLE_SPACING } from "../constants.ts";
import type { UserbarOptions } from "../render/render.types.ts";
import type { Draft } from "../types.ts";
import { hexToRgb } from "./color.ts";

export function widthError(width: number): string | null {
  if (Number.isInteger(width) && width >= 1 && width <= MAX_WIDTH) return null;
  return `Width must be a whole number from 1 to ${MAX_WIDTH}.`;
}

export function heightError(height: number): string | null {
  if (Number.isInteger(height) && height >= 1 && height <= MAX_HEIGHT) return null;
  return `Height must be a whole number from 1 to ${MAX_HEIGHT}.`;
}

export function sizeError(width: number, height: number): string | null {
  return widthError(width) ?? heightError(height);
}

export function spacingError(spacing: number): string | null {
  if (Number.isInteger(spacing) && spacing >= 1) return null;
  return "Pattern spacing must be a whole number of at least 1.";
}

export function sampleSpacing(spacing: number): number {
  if (Number.isInteger(spacing) && spacing >= 1) return spacing;
  return SAMPLE_SPACING;
}

/** Adapts a nullable validator to a React Hook Form `validate` rule. */
export function asRule(check: (value: number) => string | null): (value: number) => true | string {
  return (value) => check(value) ?? true;
}

export function toggledIds(ids: string[], id: string): string[] {
  if (ids.includes(id)) return ids.filter((current) => current !== id);
  return [...ids, id];
}

export function toOptions(draft: Draft): UserbarOptions {
  return {
    width: draft.width,
    height: draft.height,
    backgroundTop: hexToRgb(draft.backgroundTop),
    backgroundBottom: hexToRgb(draft.backgroundBottom),
    gradientAxis: draft.gradientAxis,
    shape: draft.shape,
    bevel: draft.bevel,
    text: draft.text,
    textColor: { ...hexToRgb(draft.textColor.hex), a: draft.textColor.opacity / 100 },
    outlineColor: { ...hexToRgb(draft.outlineColor.hex), a: draft.outlineColor.opacity / 100 },
    textPlacement: draft.textPlacement,
    gloss: { ...hexToRgb(draft.gloss.hex), a: draft.gloss.opacity / 100 },
    border: { ...hexToRgb(draft.border.hex), a: draft.border.opacity / 100 },
    patternId: draft.patternId,
    effectIds: draft.effectIds,
    scanline: { ...hexToRgb(draft.scanline.hex), a: draft.scanline.opacity / 100 },
    scanlineFlip: draft.scanlineFlip,
    scanlineSpacing: draft.scanlineSpacing,
    backgroundImage: draft.backgroundImage,
    imagePlacement: draft.imagePlacement,
  };
}
