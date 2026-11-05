import { GIFEncoder } from "gifenc";

function colorKey(red: number, green: number, blue: number): number {
  return (red << 16) | (green << 8) | blue;
}

const CLEAR = 128;

function hasClearPixel(frames: ImageData[]): boolean {
  for (const frame of frames) {
    const data = frame.data;
    for (let index = 3; index < data.length; index += 4) {
      if ((data[index] ?? 255) < CLEAR) return true;
    }
  }
  return false;
}

function indexFrames(frames: ImageData[]): {
  palette: number[][];
  indices: Uint8Array[];
  transparentIndex: number | null;
} {
  const palette: number[][] = [];
  const lookup = new Map<number, number>();
  const transparentIndex = hasClearPixel(frames) ? 0 : null;
  if (transparentIndex !== null) palette.push([0, 0, 0]);
  const indices = frames.map((frame) => {
    const pixels = new Uint8Array(frame.width * frame.height);
    const data = frame.data;
    for (let pixel = 0; pixel < pixels.length; pixel += 1) {
      const offset = pixel * 4;
      if ((data[offset + 3] ?? 255) < CLEAR && transparentIndex !== null) {
        pixels[pixel] = transparentIndex;
        continue;
      }
      const red = data[offset] ?? 0;
      const green = data[offset + 1] ?? 0;
      const blue = data[offset + 2] ?? 0;
      const key = colorKey(red, green, blue);
      let index = lookup.get(key);
      if (index === undefined) {
        index = palette.length;
        palette.push([red, green, blue]);
        lookup.set(key, index);
      }
      pixels[pixel] = index;
    }
    return pixels;
  });
  return { palette, indices, transparentIndex };
}

export function encodeGif(frames: ImageData[], delayCentiseconds: number): Blob {
  const first = frames[0];
  if (!first) return new Blob([], { type: "image/gif" });
  const { palette, indices, transparentIndex } = indexFrames(frames);
  const gif = GIFEncoder();
  const delay = delayCentiseconds * 10;
  indices.forEach((index, frame) => {
    const source = frames[frame] ?? first;
    gif.writeFrame(index, source.width, source.height, {
      palette: frame === 0 ? palette : undefined,
      delay,
      repeat: 0,
      transparent: transparentIndex !== null,
      transparentIndex: transparentIndex ?? 0,
    });
  });
  gif.finish();
  const bytes = gif.bytes();
  const copy = new Uint8Array(bytes.length);
  copy.set(bytes);
  return new Blob([copy], { type: "image/gif" });
}

export function downloadGif(frames: ImageData[], delayCentiseconds: number, filename: string): void {
  const url = URL.createObjectURL(encodeGif(frames, delayCentiseconds));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
