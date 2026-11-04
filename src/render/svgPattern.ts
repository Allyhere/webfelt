import {
  drawPixel,
  rgbaToLinear,
  toImageData,
  type Surface,
} from "./color.ts";
import { createGradientSurface } from "./gradient.ts";
import type { Rgb, Rgba } from "./types.ts";

const REFERENCE_SPACING = 4;
const SAMPLE_SIZE = 48;

type RectShape = {
  kind: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
};

type CircleShape = {
  kind: "circle";
  cx: number;
  cy: number;
  r: number;
  opacity: number;
};

type LineShape = {
  kind: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth: number;
  opacity: number;
};

type Shape = RectShape | CircleShape | LineShape;

type Tile = {
  width: number;
  height: number;
  shapes: Shape[];
};

const tiles = new Map<string, Tile>();

function euclideanMod(value: number, spacing: number): number {
  return ((value % spacing) + spacing) % spacing;
}

function readNumber(element: Element, name: string, fallback: number): number {
  const raw = element.getAttribute(name);
  if (raw === null || raw.trim() === "") return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readOpacity(element: Element): number {
  const opacity = readNumber(element, "opacity", 1);
  const specific =
    element.getAttribute("fill-opacity") ?? element.getAttribute("stroke-opacity");
  const extra = specific === null ? 1 : Number(specific);
  return opacity * (Number.isFinite(extra) ? extra : 1);
}

function tileSize(root: Element): { width: number; height: number } {
  const width = Number(root.getAttribute("width"));
  const height = Number(root.getAttribute("height"));
  if (width > 0 && height > 0) return { width, height };
  const box = root
    .getAttribute("viewBox")
    ?.trim()
    .split(/[\s,]+/)
    .map(Number);
  if (box && box.length === 4 && box[2] > 0 && box[3] > 0) {
    return { width: box[2], height: box[3] };
  }
  return { width: REFERENCE_SPACING, height: REFERENCE_SPACING };
}

function readShape(element: Element): Shape | null {
  const opacity = readOpacity(element);
  if (opacity <= 0) return null;
  if (element.tagName === "rect") {
    const width = readNumber(element, "width", 0);
    const height = readNumber(element, "height", 0);
    if (width <= 0 || height <= 0 || element.getAttribute("fill") === "none") return null;
    return {
      kind: "rect",
      x: readNumber(element, "x", 0),
      y: readNumber(element, "y", 0),
      width,
      height,
      opacity,
    };
  }
  if (element.tagName === "circle") {
    const radius = readNumber(element, "r", 0);
    if (radius <= 0 || element.getAttribute("fill") === "none") return null;
    return {
      kind: "circle",
      cx: readNumber(element, "cx", 0),
      cy: readNumber(element, "cy", 0),
      r: radius,
      opacity,
    };
  }
  if (element.tagName === "line") {
    const strokeWidth = readNumber(element, "stroke-width", 1);
    if (strokeWidth <= 0 || element.getAttribute("stroke") === "none") return null;
    return {
      kind: "line",
      x1: readNumber(element, "x1", 0),
      y1: readNumber(element, "y1", 0),
      x2: readNumber(element, "x2", 0),
      y2: readNumber(element, "y2", 0),
      strokeWidth,
      opacity,
    };
  }
  return null;
}

function parseTile(svg: string): Tile {
  const root = new DOMParser().parseFromString(svg, "image/svg+xml").documentElement;
  const shapes: Shape[] = [];
  for (const element of root.children) {
    const shape = readShape(element);
    if (shape) shapes.push(shape);
  }
  return { ...tileSize(root), shapes };
}

function tileFor(svg: string): Tile {
  const cached = tiles.get(svg);
  if (cached) return cached;
  const tile = parseTile(svg);
  tiles.set(svg, tile);
  return tile;
}

function distanceToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) return Math.hypot(px - x1, py - y1);
  const t = Math.min(
    1,
    Math.max(0, ((px - x1) * dx + (py - y1) * dy) / lengthSquared),
  );
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function shapeCovers(shape: Shape, x: number, y: number, scale: number): boolean {
  if (shape.kind === "rect") {
    return (
      x >= shape.x &&
      x < shape.x + shape.width &&
      y >= shape.y &&
      y < shape.y + shape.height
    );
  }
  const px = x + 0.5 / scale;
  const py = y + 0.5 / scale;
  if (shape.kind === "circle") {
    const dx = px - shape.cx;
    const dy = py - shape.cy;
    return dx * dx + dy * dy <= shape.r * shape.r;
  }
  return (
    distanceToSegment(px, py, shape.x1, shape.y1, shape.x2, shape.y2) <=
    shape.strokeWidth / 2
  );
}

function coverOpacity(shapes: Shape[], x: number, y: number, scale: number): number {
  let opacity = 0;
  for (const shape of shapes) {
    if (shapeCovers(shape, x, y, scale)) opacity = shape.opacity;
  }
  return opacity;
}

export function drawSvgPattern(
  surface: Surface,
  svg: string,
  color: Rgba,
  spacing: number,
  flip: boolean,
): void {
  if (color.a <= 0 || spacing < 1) return;
  const tile = tileFor(svg);
  const scale = spacing / REFERENCE_SPACING;
  const periodX = tile.width * scale;
  const periodY = tile.height * scale;
  if (periodX < 1 || periodY < 1) return;
  const linear = rgbaToLinear(color);
  for (let y = 0; y < surface.height; y += 1) {
    for (let x = 0; x < surface.width; x += 1) {
      const localX = euclideanMod(x, periodX);
      const unitX = flip
        ? tile.width - (localX + 1) / scale
        : localX / scale;
      const unitY = euclideanMod(y, periodY) / scale;
      const opacity = coverOpacity(tile.shapes, unitX, unitY, scale);
      if (opacity <= 0) continue;
      drawPixel(surface, x, y, { ...linear, a: linear.a * opacity });
    }
  }
}

export function renderPatternSample(
  svg: string,
  top: Rgb,
  bottom: Rgb,
  color: Rgba,
  spacing: number,
  flip: boolean,
): ImageData {
  const surface = createGradientSurface(SAMPLE_SIZE, SAMPLE_SIZE, top, bottom);
  drawSvgPattern(surface, svg, color, spacing, flip);
  return toImageData(surface);
}
