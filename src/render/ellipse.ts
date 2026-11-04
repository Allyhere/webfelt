import { drawPixel, rgbaToLinear, type LinearColor, type Surface } from "./color.ts";
import type { Rgba } from "./types.ts";

function insideEllipse(
  dx: number,
  dy: number,
  inverseRadiusX: number,
  inverseRadiusY: number,
): boolean {
  return dx * dx * inverseRadiusX + dy * dy * inverseRadiusY <= 1;
}

function coverage(
  dx: number,
  dy: number,
  inverseRadiusX: number,
  inverseRadiusY: number,
): number {
  let hits = 0;
  for (let subX = -3; subX <= 3; subX += 1) {
    for (let subY = -3; subY <= 3; subY += 1) {
      const sampleX = dx + subX / 7;
      const sampleY = dy + subY / 7;
      if (insideEllipse(sampleX, sampleY, inverseRadiusX, inverseRadiusY)) {
        hits += 1;
      }
    }
  }
  return hits / 49;
}

function paintEllipsePixel(
  surface: Surface,
  x: number,
  y: number,
  color: LinearColor,
  amount: number,
): void {
  drawPixel(surface, x, y, { ...color, a: color.a * amount });
}

export function drawGloss(surface: Surface, color: Rgba): void {
  if (color.a <= 0 || surface.width < 1 || surface.height < 1) return;
  const radiusX = surface.width / 2;
  const radiusY = surface.height / 2;
  if (radiusX === 0 || radiusY === 0) return;
  const inverseRadiusX = 1 / (radiusX * radiusX);
  const inverseRadiusY = 1 / (radiusY * radiusY);
  const linear = rgbaToLinear(color);
  const centerX = surface.width / 2;

  for (let y = 0; y < surface.height; y += 1) {
    for (let x = 0; x < surface.width; x += 1) {
      const dx = x - centerX;
      const dy = y;
      const towardX = dx < 0 ? 1 : -1;
      const towardY = dy < 0 ? 1 : -1;
      const outerX = dx - (3 * towardX) / 7;
      const outerY = dy - (3 * towardY) / 7;
      if (insideEllipse(outerX, outerY, inverseRadiusX, inverseRadiusY)) {
        paintEllipsePixel(surface, x, y, linear, 1);
        continue;
      }
      const innerX = dx + (3 * towardX) / 7;
      const innerY = dy + (3 * towardY) / 7;
      if (insideEllipse(innerX, innerY, inverseRadiusX, inverseRadiusY)) {
        paintEllipsePixel(
          surface,
          x,
          y,
          linear,
          coverage(dx, dy, inverseRadiusX, inverseRadiusY),
        );
      }
    }
  }
}
