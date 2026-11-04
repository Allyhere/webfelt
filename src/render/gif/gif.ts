import { GIFEncoder } from "gifenc";

function colorKey(red: number, green: number, blue: number): number {
  return (red << 16) | (green << 8) | blue;
}

function indexFrames(frames: ImageData[]): { palette: number[][]; indices: Uint8Array[] } {
  const palette: number[][] = [];
  const lookup = new Map<number, number>();
  const indices = frames.map((frame) => {
    const pixels = new Uint8Array(frame.width * frame.height);
    for (let pixel = 0; pixel < pixels.length; pixel += 1) {
      const offset = pixel * 4;
      const red = frame.data[offset] ?? 0;
      const green = frame.data[offset + 1] ?? 0;
      const blue = frame.data[offset + 2] ?? 0;
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
  return { palette, indices };
}

export function encodeGif(frames: ImageData[], delayCentiseconds: number): Blob {
  const first = frames[0];
  if (!first) return new Blob([], { type: "image/gif" });
  const { palette, indices } = indexFrames(frames);
  const gif = GIFEncoder();
  const delay = delayCentiseconds * 10;
  indices.forEach((index, frame) => {
    const source = frames[frame] ?? first;
    gif.writeFrame(index, source.width, source.height, {
      palette: frame === 0 ? palette : undefined,
      delay,
      repeat: 0,
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
