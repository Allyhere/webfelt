import type { Rgb } from "../render.types.ts";
import type { BadgeFinish, BadgeShape, GradientAxis } from "./badgeShape.types.ts";

function mixRgb(start: Rgb, end: Rgb, amount: number): Rgb {
  return {
    r: Math.round(start.r + (end.r - start.r) * amount),
    g: Math.round(start.g + (end.g - start.g) * amount),
    b: Math.round(start.b + (end.b - start.b) * amount),
  };
}

const BEVEL_MIX = 0.45;
const LIGHT: Rgb = { r: 255, g: 255, b: 255 };
const DARK: Rgb = { r: 0, g: 0, b: 0 };

export function badgeRadius(width: number, height: number, shape: BadgeShape): number {
  if (shape !== "round") return 0;
  return Math.min(4, Math.floor(Math.min(width, height) / 8));
}

export function insideBadge(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): boolean {
  if (x < 0 || y < 0 || x >= width || y >= height) return false;
  if (radius <= 0) return true;
  const limit = Math.min(radius, Math.floor((Math.min(width, height) - 1) / 2));
  if (limit <= 0) return true;
  let dx = 0;
  let dy = 0;
  if (x < limit) dx = limit - x;
  else if (x >= width - limit) dx = x - (width - limit - 1);
  if (y < limit) dy = limit - y;
  else if (y >= height - limit) dy = y - (height - limit - 1);
  return dx * dx + dy * dy <= limit * limit;
}

function coversInset(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  inset: number,
): boolean {
  if (inset <= 0) return insideBadge(x, y, width, height, radius);
  const innerWidth = width - inset * 2;
  const innerHeight = height - inset * 2;
  if (innerWidth < 1 || innerHeight < 1) return false;
  return insideBadge(
    x - inset,
    y - inset,
    innerWidth,
    innerHeight,
    Math.max(0, radius - inset),
  );
}

function onBevel(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  borderWidth: number,
): boolean {
  const border = Math.max(0, borderWidth);
  return (
    coversInset(x, y, width, height, radius, border) &&
    !coversInset(x, y, width, height, radius, border + 1)
  );
}

function closestEdgeIsLight(x: number, y: number, width: number, height: number): boolean {
  const top = y;
  const left = x;
  const bottom = height - 1 - y;
  const right = width - 1 - x;
  const nearest = Math.min(top, left, bottom, right);
  return top === nearest || left === nearest;
}

function gradientRgb(
  x: number,
  y: number,
  width: number,
  height: number,
  fill: Rgb,
  fillEnd: Rgb,
  axis: GradientAxis,
): Rgb {
  const horizontal = axis === "horizontal";
  const span = Math.max((horizontal ? width : height) - 1, 1);
  const amount = (horizontal ? x : y) / span;
  return mixRgb(fill, fillEnd, amount);
}

function clearPixel(image: ImageData, x: number, y: number): void {
  const index = (y * image.width + x) * 4;
  image.data[index + 3] = 0;
}

export function finishBadge(image: ImageData, options: BadgeFinish): void {
  if (options.radius <= 0 && !options.bevel) return;
  const { width, height } = image;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!insideBadge(x, y, width, height, options.radius)) {
        clearPixel(image, x, y);
        continue;
      }
      if (!options.bevel) continue;
      if (!onBevel(x, y, width, height, options.radius, options.borderWidth)) continue;
      const fill = gradientRgb(x, y, width, height, options.fill, options.fillEnd, options.axis);
      const color = closestEdgeIsLight(x, y, width, height)
        ? mixRgb(fill, LIGHT, BEVEL_MIX)
        : mixRgb(fill, DARK, BEVEL_MIX);
      const index = (y * width + x) * 4;
      image.data[index] = color.r;
      image.data[index + 1] = color.g;
      image.data[index + 2] = color.b;
      image.data[index + 3] = 255;
    }
  }
}

function onContour(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): boolean {
  if (!insideBadge(x, y, width, height, radius)) return false;
  return (
    !insideBadge(x - 1, y, width, height, radius) ||
    !insideBadge(x + 1, y, width, height, radius) ||
    !insideBadge(x, y - 1, width, height, radius) ||
    !insideBadge(x, y + 1, width, height, radius)
  );
}

export function paintBadgeOutline(
  image: ImageData,
  radius: number,
  color: Rgb,
  alpha: number,
): void {
  if (radius <= 0 || alpha <= 0) return;
  const { width, height, data } = image;
  const hits: number[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (onContour(x, y, width, height, radius)) hits.push(y * width + x);
    }
  }
  const keep = 1 - alpha;
  for (const pixel of hits) {
    const index = pixel * 4;
    data[index] = Math.round((data[index] ?? 0) * keep + color.r * alpha);
    data[index + 1] = Math.round((data[index + 1] ?? 0) * keep + color.g * alpha);
    data[index + 2] = Math.round((data[index + 2] ?? 0) * keep + color.b * alpha);
    data[index + 3] = 255;
  }
}
