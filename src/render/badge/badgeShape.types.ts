import type { Rgb } from "../render.types.ts";

export type BadgeShape = "square" | "round";

export type GradientAxis = "vertical" | "horizontal";

export type BadgeFinish = {
  radius: number;
  bevel: boolean;
  fill: Rgb;
  fillEnd: Rgb;
  axis: GradientAxis;
  borderWidth: number;
};
