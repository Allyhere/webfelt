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

function inRing(x: number, y: number, box: Rect): boolean {
  const localX = x - box.x;
  const localY = y - box.y;
  if (localX < 0 || localY < 0 || localX >= box.width || localY >= box.height) return false;
  return (
    localX < BLINKIE_BORDER ||
    localY < BLINKIE_BORDER ||
    localX >= box.width - BLINKIE_BORDER ||
    localY >= box.height - BLINKIE_BORDER
  );
}

function centerPath(box: Rect): Point[] {
  const left = box.x + BLINKIE_BORDER;
  const right = box.x + box.width - BLINKIE_BORDER - 1;
  const top = box.y + BLINKIE_BORDER;
  const bottom = box.y + box.height - BLINKIE_BORDER - 1;
  if (right < left || bottom < top) return [];
  const path: Point[] = [];
  for (let x = left; x <= right; x += 1) path.push({ x, y: box.y + 1 });
  for (let y = top; y <= bottom; y += 1) path.push({ x: box.x + box.width - 2, y });
  for (let x = right; x >= left; x -= 1) path.push({ x, y: box.y + box.height - 2 });
  for (let y = bottom; y >= top; y -= 1) path.push({ x: box.x + 1, y });
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
): void {
  const flash = motion === "flash" && frame % 2 === 1;
  for (let y = box.y; y < box.y + box.height; y += 1) {
    for (let x = box.x; x < box.x + box.width; x += 1) {
      if (!inRing(x, y, box)) continue;
      drawBitmapPixel(image, x, y, flash ? accent : border);
    }
  }
  if (motion === "still" || motion === "flash") return;
  const path = centerPath(box);
  for (let index = 0; index < path.length; index += 1) {
    if (!litPixel(motion, index, frame)) continue;
    const point = path[index];
    if (!point) continue;
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
  );
  return image;
}
