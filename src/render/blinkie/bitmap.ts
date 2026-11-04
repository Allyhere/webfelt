import type { Rgb } from "../render.types.ts";

export function createBitmap(width: number, height: number, color: Rgb): ImageData {
  const image = new ImageData(width, height);
  fillBitmap(image, color);
  return image;
}

export function fillBitmap(image: ImageData, color: Rgb): void {
  const { data } = image;
  for (let index = 0; index < data.length; index += 4) {
    data[index] = color.r;
    data[index + 1] = color.g;
    data[index + 2] = color.b;
    data[index + 3] = 255;
  }
}

export function drawBitmapPixel(image: ImageData, x: number, y: number, color: Rgb): void {
  if (x < 0 || y < 0 || x >= image.width || y >= image.height) return;
  const index = (y * image.width + x) * 4;
  image.data[index] = color.r;
  image.data[index + 1] = color.g;
  image.data[index + 2] = color.b;
  image.data[index + 3] = 255;
}

export function mixRgb(start: Rgb, end: Rgb, amount: number): Rgb {
  return {
    r: Math.round(start.r + (end.r - start.r) * amount),
    g: Math.round(start.g + (end.g - start.g) * amount),
    b: Math.round(start.b + (end.b - start.b) * amount),
  };
}
