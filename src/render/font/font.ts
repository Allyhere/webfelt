import { FONT, INK } from "./font.constants.ts";
import type { FontFace, Glyph, InkBounds } from "./font.types.ts";

let ready: Promise<void> | null = null;
let face: FontFace | null = null;
const cache = new Map<string, Uint8Array[]>();

function inkBounds(image: ImageData): InkBounds {
  let top = image.height;
  let bottom = -1;
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      if (image.data[(y * image.width + x) * 4 + 3] <= INK) continue;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }
  return { top, bottom };
}

function hasInk(bounds: InkBounds): boolean {
  return bounds.bottom >= bounds.top;
}

function prepareContext(context: CanvasRenderingContext2D): void {
  context.font = FONT;
  context.textBaseline = "top";
  context.fillStyle = "#ffffff";
  context.imageSmoothingEnabled = false;
}

async function loadFont(): Promise<void> {
  await document.fonts.load(FONT);
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas is not available");
  prepareContext(context);
  const sample = "HgyjpQ";
  canvas.width = Math.ceil(context.measureText(sample).width) + 8;
  canvas.height = 32;
  prepareContext(context);
  context.fillText(sample, 0, 0);
  const bounds = inkBounds(context.getImageData(0, 0, canvas.width, canvas.height));
  const top = hasInk(bounds) ? bounds.top : 0;
  const bottom = hasInk(bounds) ? bounds.bottom : 8;
  face = { top, height: bottom - top + 1, canvas, context };
}

export function ensureFont(): Promise<void> {
  ready ??= loadFont();
  return ready;
}

function boxGlyph(height: number): Uint8Array[] {
  const width = Math.max(3, Math.min(5, height));
  return Array.from({ length: width }, (_, x) => {
    const column = new Uint8Array(height);
    for (let y = 0; y < height; y += 1) {
      const edge = x === 0 || x === width - 1 || y === 0 || y === height - 1;
      if (edge) column[y] = 1;
    }
    return column;
  });
}

function readGlyph(char: string, metrics: FontFace): Uint8Array[] {
  const { canvas, context, top, height } = metrics;
  prepareContext(context);
  const width = Math.max(8, Math.ceil(context.measureText(char).width) + 4);
  canvas.width = width;
  canvas.height = top + height + 2;
  prepareContext(context);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(char, 0, 0);
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const columns: Uint8Array[] = [];
  let first = canvas.width;
  let last = -1;
  for (let x = 0; x < canvas.width; x += 1) {
    const column = new Uint8Array(height);
    for (let row = 0; row < height; row += 1) {
      const alpha = image.data[((top + row) * canvas.width + x) * 4 + 3];
      if (alpha <= INK) continue;
      column[row] = 1;
      if (x < first) first = x;
      if (x > last) last = x;
    }
    columns.push(column);
  }
  if (last < first) return boxGlyph(height);
  return columns.slice(first, last + 1);
}

function glyphColumns(char: string): Uint8Array[] {
  const cached = cache.get(char);
  if (cached) return cached;
  const metrics = face;
  if (!metrics) return [];
  const columns =
    char === " "
      ? Array.from({ length: 3 }, () => new Uint8Array(metrics.height))
      : readGlyph(char, metrics);
  cache.set(char, columns);
  return columns;
}

export function layoutGlyphs(text: string): Glyph[] {
  return Array.from(text).map((char) => ({
    columns: glyphColumns(char),
    space: char === " ",
  }));
}

export function layoutText(text: string): Uint8Array[] {
  const glyphs = layoutGlyphs(text);
  const columns: Uint8Array[] = [];
  const rowCount = face?.height ?? glyphs[0]?.columns[0]?.length ?? 0;
  for (let index = 0; index < glyphs.length; index += 1) {
    columns.push(...glyphs[index].columns);
    if (index < glyphs.length - 1) columns.push(new Uint8Array(rowCount));
  }
  return columns;
}
