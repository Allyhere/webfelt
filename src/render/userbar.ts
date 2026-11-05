import { badgeRadius, finishBadge, paintBadgeOutline } from "./badge/badgeShape.ts";
import { drawPixel, rgbaToLinear, toImageData } from "./color/color.ts";
import type { Surface } from "./color/color.types.ts";
import { applyEffects } from "../features/effects/applyEffects.ts";
import { drawGloss } from "./ellipse.ts";
import { ensureFont } from "./font/font.ts";
import { createGradientSurface } from "./gradient.ts";
import { axisOffset } from "./placement.ts";
import { patternSource } from "../features/patterns/patternCatalog/patternCatalog.ts";
import { drawSvgPattern } from "../features/patterns/svgPattern/svgPattern.ts";
import { drawText } from "./text.ts";
import type { UserbarOptions } from "./render.types.ts";

function isInsideImage(image: ImageData, x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < image.width && y < image.height;
}

function drawBackgroundImage(
  surface: Surface,
  image: ImageData,
  options: UserbarOptions,
): void {
  const offsetX = axisOffset(
    options.imagePlacement.horizontal,
    options.imagePlacement.horizontalDistance,
    image.width,
    surface.width,
  );
  const offsetY = axisOffset(
    options.imagePlacement.vertical,
    options.imagePlacement.verticalDistance,
    image.height,
    surface.height,
  );
  for (let y = 0; y < surface.height; y += 1) {
    for (let x = 0; x < surface.width; x += 1) {
      const imageX = x - offsetX;
      const imageY = y - offsetY;
      if (!isInsideImage(image, imageX, imageY)) continue;
      const index = (imageY * image.width + imageX) * 4;
      const alpha = image.data[index + 3];
      if (alpha === 0) continue;
      drawPixel(
        surface,
        x,
        y,
        rgbaToLinear({
          r: image.data[index],
          g: image.data[index + 1],
          b: image.data[index + 2],
          a: alpha / 255,
        }),
      );
    }
  }
}

function drawBorder(surface: Surface, options: UserbarOptions): void {
  if (options.border.a <= 0) return;
  const color = rgbaToLinear(options.border);
  const { width, height } = surface;
  for (let x = 1; x < width; x += 1) drawPixel(surface, x, 0, color);
  for (let y = 1; y < height; y += 1) drawPixel(surface, width - 1, y, color);
  if (width > 1) {
    for (let x = 0; x < width - 1; x += 1) drawPixel(surface, x, height - 1, color);
  }
  if (height > 1) {
    for (let y = 0; y < height - 1; y += 1) drawPixel(surface, 0, y, color);
  }
}

export async function renderUserbar(options: UserbarOptions): Promise<ImageData> {
  await ensureFont();
  const surface = createGradientSurface(
    options.width,
    options.height,
    options.backgroundTop,
    options.backgroundBottom,
    options.gradientAxis,
  );
  drawSvgPattern(
    surface,
    patternSource(options.patternId),
    options.scanline,
    options.scanlineSpacing,
    options.scanlineFlip,
  );
  if (options.backgroundImage) {
    drawBackgroundImage(surface, options.backgroundImage, options);
  }
  applyEffects(surface, options.effectIds);
  drawGloss(surface, options.gloss);
  drawText(
    surface,
    options.text,
    options.textColor,
    options.outlineColor,
    options.textPlacement,
  );
  drawBorder(surface, options);
  const image = toImageData(surface);
  const radius = badgeRadius(options.width, options.height, options.shape);
  finishBadge(image, {
    radius,
    bevel: options.bevel,
    fill: options.backgroundTop,
    fillEnd: options.backgroundBottom,
    axis: options.gradientAxis,
    borderWidth: options.border.a > 0 ? 1 : 0,
  });
  paintBadgeOutline(image, radius, options.border, options.border.a);
  return image;
}
