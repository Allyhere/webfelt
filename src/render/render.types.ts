import type { BadgeShape, GradientAxis } from "./badge/badgeShape.types.ts";

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
  gradientAxis: GradientAxis;
  shape: BadgeShape;
  bevel: boolean;
  text: string;
  textColor: Rgba;
  outlineColor: Rgba;
  textPlacement: Placement;
  gloss: Rgba;
  border: Rgba;
  patternId: string;
  effectIds: string[];
  scanline: Rgba;
  scanlineFlip: boolean;
  scanlineSpacing: number;
  backgroundImage: ImageData | null;
  imagePlacement: Placement;
};
