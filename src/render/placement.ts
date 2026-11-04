import type { Anchor } from "./render.types.ts";

export function axisOffset(
  anchor: Anchor,
  distance: number,
  innerSize: number,
  outerSize: number,
): number {
  const gap = Math.trunc(distance);
  if (anchor === "center") return Math.trunc((outerSize - innerSize) / 2);
  if (anchor === "start") return gap;
  return outerSize - innerSize - gap;
}
