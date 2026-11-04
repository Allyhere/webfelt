import type { Surface } from "../../render/color/color.types.ts";
import { sampleBilinear, writePixel } from "./buffer/buffer.ts";

type EffectFn = (source: Surface, destination: Surface) => void;

function bulgeScale(distance: number, maxDistance: number): number {
  if (distance === 0) return 0;
  const normalized = distance / maxDistance;
  return (normalized ** 1.55 * maxDistance) / distance;
}

export const bulge: EffectFn = (source, destination) => {
  const centerX = (source.width - 1) / 2;
  const centerY = (source.height - 1) / 2;
  const maxDistance = Math.hypot(centerX, centerY) || 1;
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const dx = x - centerX;
      const dy = y - centerY;
      const scale = bulgeScale(Math.hypot(dx, dy), maxDistance);
      writePixel(
        destination,
        x,
        y,
        sampleBilinear(source, centerX + dx * scale, centerY + dy * scale),
      );
    }
  }
};
