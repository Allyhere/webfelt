export type Rgb = {
  r: number;
  g: number;
  b: number;
};

export type Rgba = Rgb & {
  a: number;
};

export type Anchor = "start" | "center" | "end";

export type Placement = {
  horizontal: Anchor;
  horizontalDistance: number;
  vertical: Anchor;
  verticalDistance: number;
};

export type UserbarOptions = {
  width: number;
  height: number;
  backgroundTop: Rgb;
  backgroundBottom: Rgb;
  text: string;
  textColor: Rgba;
  outlineColor: Rgba;
  textPlacement: Placement;
  gloss: Rgba;
  border: Rgba;
  patternId: string;
  effectId: string;
  scanline: Rgba;
  scanlineFlip: boolean;
  scanlineSpacing: number;
  backgroundImage: ImageData | null;
  imagePlacement: Placement;
};

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
