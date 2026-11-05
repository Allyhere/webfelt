import { badgeRadius, finishBadge, paintBadgeOutline } from "../badge/badgeShape.ts";
import type { BadgeShape } from "../badge/badgeShape.types.ts";
import type { Rgb } from "../render.types.ts";
import { createBitmap, drawBitmapPixel } from "./bitmap.ts";
import {
  BLINKIE_BORDER,
  BLINKIE_HEIGHT,
  BLINKIE_WIDTH,
  SWATCH_FILL,
  SWATCH_SIZE,
} from "./blinkie.constants.ts";
import type { BlinkieFormat, Rect } from "./blinkie.types.ts";

export type BlinkieFormatSpec = {
  width: number;
  height: number;
  border: number;
  shape: BadgeShape;
  bevel: boolean;
};

export function blinkieFormat(format: BlinkieFormat): BlinkieFormatSpec {
  if (format === "badge") {
    return { width: 88, height: 31, border: 1, shape: "round", bevel: true };
  }
  if (format === "stamp") {
    return { width: 32, height: 32, border: 1, shape: "round", bevel: true };
  }
  return {
    width: BLINKIE_WIDTH,
    height: BLINKIE_HEIGHT,
    border: BLINKIE_BORDER,
    shape: "square",
    bevel: false,
  };
}

export function blinkieInterior(spec: BlinkieFormatSpec): Rect {
  return {
    x: spec.border,
    y: spec.border,
    width: spec.width - spec.border * 2,
    height: spec.height - spec.border * 2,
  };
}

function blit(target: ImageData, source: ImageData, originX: number, originY: number): void {
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const sourceIndex = (y * source.width + x) * 4;
      if ((source.data[sourceIndex + 3] ?? 0) === 0) continue;
      drawBitmapPixel(target, originX + x, originY + y, {
        r: source.data[sourceIndex] ?? 0,
        g: source.data[sourceIndex + 1] ?? 0,
        b: source.data[sourceIndex + 2] ?? 0,
      });
    }
  }
}

export function paintFormatSwatch(format: BlinkieFormat, fill: Rgb, border: Rgb): ImageData {
  const spec = blinkieFormat(format);
  const width = format === "stamp" ? 28 : 40;
  const height = format === "blinkie" ? 12 : format === "badge" ? 16 : 28;
  const chip = createBitmap(width, height, fill);
  const radius = badgeRadius(width, height, spec.shape);
  finishBadge(chip, {
    radius,
    bevel: spec.bevel,
    fill,
    fillEnd: fill,
    axis: "vertical",
    borderWidth: spec.border,
  });
  paintBadgeOutline(chip, radius, border, 1);
  const image = createBitmap(SWATCH_SIZE, SWATCH_SIZE, SWATCH_FILL);
  blit(
    image,
    chip,
    Math.floor((SWATCH_SIZE - width) / 2),
    Math.floor((SWATCH_SIZE - height) / 2),
  );
  return image;
}
