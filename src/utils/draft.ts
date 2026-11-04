import { MAX_HEIGHT, MAX_WIDTH, SAMPLE_SPACING } from "../constants.ts";
import type { UserbarOptions } from "../render/render.types.ts";
import type { Draft } from "../types.ts";
import { hexToRgb } from "./color.ts";

export function sizeError(width: number, height: number): string | null {
  if (!(Number.isInteger(width) && width >= 1 && width <= MAX_WIDTH)) {
    return `Width must be a whole number from 1 to ${MAX_WIDTH}.`;
  }
  if (!(Number.isInteger(height) && height >= 1 && height <= MAX_HEIGHT)) {
    return `Height must be a whole number from 1 to ${MAX_HEIGHT}.`;
  }
  return null;
}

export function spacingError(spacing: number): string | null {
  if (Number.isInteger(spacing) && spacing >= 1) return null;
  return "Pattern spacing must be a whole number of at least 1.";
}

export function sampleSpacing(spacing: number): number {
  if (Number.isInteger(spacing) && spacing >= 1) return spacing;
  return SAMPLE_SPACING;
}

export function numberFromInput(value: string): number {
  if (value === "") return Number.NaN;
  return Number(value);
}

export function numberInputValue(value: number): number | "" {
  if (Number.isNaN(value)) return "";
  return value;
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
