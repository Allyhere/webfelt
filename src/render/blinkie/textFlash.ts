import { ensureFont, layoutGlyphs } from "../font/font.ts";
import type { Glyph } from "../font/font.types.ts";
import { RAINBOW, SWATCH_FILL, SWATCH_SIZE } from "./blinkie.constants.ts";
import { createBitmap, drawBitmapPixel, mixRgb } from "./bitmap.ts";
import type { FontMotion, Rect } from "./blinkie.types.ts";
import type { Rgb } from "../render.types.ts";

const PULSE = [0, 0.5, 1, 0.5];

export function chaseSteps(letterCount: number): number {
  if (letterCount <= 0) return 1;
  if (letterCount <= 2) return 2;
  if (letterCount <= 4) return 4;
  return 6;
}

export function laidOutWidth(glyphs: Glyph[]): number {
  let width = 0;
  for (let index = 0; index < glyphs.length; index += 1) {
    width += glyphs[index]?.columns.length ?? 0;
    if (index < glyphs.length - 1) width += 1;
  }
  return width;
}

function glyphHeight(glyphs: Glyph[]): number {
  for (const glyph of glyphs) {
    const height = glyph.columns[0]?.length ?? 0;
    if (height > 0) return height;
  }
  return 0;
}

function letterCount(glyphs: Glyph[]): number {
  return glyphs.filter((glyph) => !glyph.space).length;
}

function fillForGlyph(
  motion: FontMotion,
  frame: number,
  letterIndex: number,
  letters: number,
  textColor: Rgb,
  flashColor: Rgb,
): Rgb | null {
  if (motion === "blink" && frame % 2 === 1) return null;
  if (motion === "flash") return frame % 2 === 0 ? textColor : flashColor;
  if (motion === "pulse") return mixRgb(textColor, flashColor, PULSE[frame % PULSE.length] ?? 0);
  if (motion === "chase") {
    if (letterIndex < 0) return textColor;
    const steps = chaseSteps(letters);
    const band = Math.floor((letterIndex * steps) / letters);
    return band === frame % steps ? flashColor : textColor;
  }
  if (motion === "rainbow") {
    if (letterIndex < 0) return textColor;
    return RAINBOW[(letterIndex + frame) % RAINBOW.length] ?? textColor;
  }
  return textColor;
}

function drawClipped(image: ImageData, area: Rect, x: number, y: number, color: Rgb): void {
  if (x < area.x || y < area.y || x >= area.x + area.width || y >= area.y + area.height) return;
  drawBitmapPixel(image, x, y, color);
}

function paintColumn(
  image: ImageData,
  area: Rect,
  column: Uint8Array,
  originX: number,
  originY: number,
  color: Rgb,
  outline: boolean,
): void {
  for (let y = 0; y < column.length; y += 1) {
    if (column[y] !== 1) continue;
    if (!outline) {
      drawClipped(image, area, originX, originY + y, color);
      continue;
    }
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        drawClipped(image, area, originX + dx, originY + y + dy, color);
      }
    }
  }
}

export function paintText(
  image: ImageData,
  area: Rect,
  glyphs: Glyph[],
  motion: FontMotion,
  frame: number,
  textColor: Rgb,
  outlineColor: Rgb,
  flashColor: Rgb,
): void {
  const width = laidOutWidth(glyphs);
  const height = glyphHeight(glyphs);
  if (width === 0 || height === 0) return;
  const originX = area.x + Math.floor((area.width - (width + 2)) / 2) + 1;
  const originY = area.y + Math.floor((area.height - (height + 2)) / 2) + 1;
  const letters = letterCount(glyphs);
  let cursor = originX;
  let letterIndex = 0;
  for (let index = 0; index < glyphs.length; index += 1) {
    const glyph = glyphs[index];
    if (!glyph) continue;
    const currentLetter = glyph.space ? -1 : letterIndex;
    if (!glyph.space) letterIndex += 1;
    const fill = fillForGlyph(motion, frame, currentLetter, letters, textColor, flashColor);
    if (fill) {
      for (let column = 0; column < glyph.columns.length; column += 1) {
        const pixels = glyph.columns[column];
        if (!pixels) continue;
        paintColumn(image, area, pixels, cursor + column, originY, outlineColor, true);
      }
      for (let column = 0; column < glyph.columns.length; column += 1) {
        const pixels = glyph.columns[column];
        if (!pixels) continue;
        paintColumn(image, area, pixels, cursor + column, originY, fill, false);
      }
    }
    cursor += glyph.columns.length;
    if (index < glyphs.length - 1) cursor += 1;
  }
}

export async function paintFontSwatch(
  text: string,
  motion: FontMotion,
  frame: number,
  textColor: Rgb,
  outlineColor: Rgb,
  flashColor: Rgb,
): Promise<ImageData> {
  await ensureFont();
  const image = createBitmap(SWATCH_SIZE, SWATCH_SIZE, SWATCH_FILL);
  paintText(
    image,
    { x: 2, y: 2, width: SWATCH_SIZE - 4, height: SWATCH_SIZE - 4 },
    layoutGlyphs(text),
    motion,
    frame,
    textColor,
    outlineColor,
    flashColor,
  );
  return image;
}
