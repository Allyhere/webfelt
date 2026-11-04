import { sampleBilinear, writePixel } from "../buffer.ts";
import type { EffectFn } from "../types.ts";

export const bulge: EffectFn = (source, destination) => {
  const centerX = (source.width - 1) / 2;
  const centerY = (source.height - 1) / 2;
  const maxDistance = Math.hypot(centerX, centerY) || 1;
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);
      const normalized = distance / maxDistance;
      const sourceDistance = normalized ** 1.55 * maxDistance;
      const scale = distance === 0 ? 0 : sourceDistance / distance;
      writePixel(
        destination,
        x,
        y,
        sampleBilinear(source, centerX + dx * scale, centerY + dy * scale),
      );
    }
  }
};
