import { insideBadge } from "../badge/badgeShape.ts";
import { BLINKIE_BORDER, PIP_DASH, PIP_PERIOD, SWATCH_FILL, SWATCH_SIZE } from "./blinkie.constants.ts";
import { createBitmap, drawBitmapPixel } from "./bitmap.ts";
import type { BorderMotion, Rect } from "./blinkie.types.ts";
import type { Rgb } from "../render.types.ts";

type Point = {
  x: number;
  y: number;
};

function mod(value: number, period: number): number {
  return ((value % period) + period) % period;
}

function inRing(
  x: number,
  y: number,
  box: Rect,
  thickness: number,
  radius: number,
): boolean {
  const localX = x - box.x;
  const localY = y - box.y;
  if (localX < 0 || localY < 0 || localX >= box.width || localY >= box.height) return false;
  if (
    localX >= thickness &&
    localY >= thickness &&
    localX < box.width - thickness &&
    localY < box.height - thickness
  ) {
    return false;
  }
  return insideBadge(localX, localY, box.width, box.height, radius);
}

function centerPath(box: Rect, thickness: number): Point[] {
  const mid = Math.floor((thickness - 1) / 2);
  const left = box.x + thickness;
  const right = box.x + box.width - thickness - 1;
  const top = box.y + thickness;
  const bottom = box.y + box.height - thickness - 1;
  if (right < left || bottom < top) return [];
  const path: Point[] = [];
  for (let x = left; x <= right; x += 1) path.push({ x, y: box.y + mid });
  for (let y = top; y <= bottom; y += 1) path.push({ x: box.x + box.width - 1 - mid, y });
  for (let x = right; x >= left; x -= 1) path.push({ x, y: box.y + box.height - 1 - mid });
  for (let y = bottom; y >= top; y -= 1) path.push({ x: box.x + mid, y });
  return path;
}

function litPixel(motion: BorderMotion, index: number, frame: number): boolean {
  if (motion === "bulbs") return index % PIP_PERIOD === frame % PIP_PERIOD;
  const phase = motion === "pips" ? (frame % 2) * 2 : frame % PIP_PERIOD;
  return mod(index - phase, PIP_PERIOD) < PIP_DASH;
}

export function paintBorder(
  image: ImageData,
  box: Rect,
  motion: BorderMotion,
  frame: number,
  border: Rgb,
  accent: Rgb,
  thickness: number,
  radius: number,
): void {
  const flash = motion === "flash" && frame % 2 === 1;
  for (let y = box.y; y < box.y + box.height; y += 1) {
    for (let x = box.x; x < box.x + box.width; x += 1) {
      if (!inRing(x, y, box, thickness, radius)) continue;
      drawBitmapPixel(image, x, y, flash ? accent : border);
    }
  }
  if (motion === "still" || motion === "flash") return;
  const path = centerPath(box, thickness);
  for (let index = 0; index < path.length; index += 1) {
    if (!litPixel(motion, index, frame)) continue;
    const point = path[index];
    if (!point) continue;
    if (!insideBadge(point.x - box.x, point.y - box.y, box.width, box.height, radius)) continue;
    drawBitmapPixel(image, point.x, point.y, accent);
  }
}

export function paintBorderSwatch(
  motion: BorderMotion,
  frame: number,
  border: Rgb,
  accent: Rgb,
): ImageData {
  const image = createBitmap(SWATCH_SIZE, SWATCH_SIZE, SWATCH_FILL);
  paintBorder(
    image,
    { x: 4, y: 14, width: 40, height: 20 },
    motion,
    frame,
    border,
    accent,
    BLINKIE_BORDER,
    0,
  );
  return image;
}
