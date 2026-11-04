import { patternCovers, patternPeriod } from "../../features/patterns/svgPattern/svgPattern.ts";
import { patternSource } from "../../features/patterns/patternCatalog/patternCatalog.ts";
import { SWATCH_SIZE } from "./blinkie.constants.ts";
import { createBitmap, drawBitmapPixel } from "./bitmap.ts";
import type { PatternMotion, Rect } from "./blinkie.types.ts";
import type { Rgb } from "../render.types.ts";

function patternStep(patternId: string): number {
  const period = patternPeriod(patternSource(patternId));
  return period.width >= 8 || period.height >= 8 ? 2 : 1;
}

function glitterCount(area: Rect): number {
  return Math.max(12, Math.round((area.width * area.height) / 90));
}

function glitterHash(frame: number, index: number): number {
  let value = Math.imul(frame + 1, 0x9e3779b1) ^ Math.imul(index + 1, 0x85ebca6b);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return (value ^ (value >>> 16)) >>> 0;
}

function paintGlitter(image: ImageData, area: Rect, frame: number, color: Rgb): void {
  const phase = frame % 4;
  const count = glitterCount(area);
  for (let index = 0; index < count; index += 1) {
    const hashed = glitterHash(phase, index);
    const x = area.x + (hashed % area.width);
    const y = area.y + (Math.floor(hashed / area.width) % area.height);
    drawBitmapPixel(image, x, y, color);
  }
}

export function paintPattern(
  image: ImageData,
  area: Rect,
  patternId: string,
  motion: PatternMotion,
  frame: number,
  color: Rgb,
): void {
  if (patternId === "none" || area.width < 1 || area.height < 1) return;
  if (patternId === "glitter") {
    paintGlitter(image, area, frame, color);
    return;
  }
  if (motion === "blink" && frame % 2 === 1) return;
  const step = patternStep(patternId);
  const phase = motion === "crawl" ? (frame % 4) * step : 0;
  const svg = patternSource(patternId);
  for (let y = 0; y < area.height; y += 1) {
    for (let x = 0; x < area.width; x += 1) {
      if (!patternCovers(svg, x - phase, y - phase)) continue;
      drawBitmapPixel(image, area.x + x, area.y + y, color);
    }
  }
}

export function paintPatternSwatch(
  patternId: string,
  motion: PatternMotion,
  frame: number,
  fill: Rgb,
  color: Rgb,
): ImageData {
  const image = createBitmap(SWATCH_SIZE, SWATCH_SIZE, fill);
  paintPattern(image, { x: 0, y: 0, width: SWATCH_SIZE, height: SWATCH_SIZE }, patternId, motion, frame, color);
  return image;
}
