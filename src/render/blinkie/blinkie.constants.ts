import type { BlinkieDraft, Rect } from "./blinkie.types.ts";
import type { Rgb } from "../render.types.ts";

export const BLINKIE_WIDTH = 150;
export const BLINKIE_HEIGHT = 20;
export const BLINKIE_BORDER = 3;
export const BLINKIE_DELAY_MIN = 4;
export const BLINKIE_DELAY_MAX = 30;
export const PIP_PERIOD = 4;
export const PIP_DASH = 2;
export const SWATCH_SIZE = 48;

export const INTERIOR: Rect = {
  x: BLINKIE_BORDER,
  y: BLINKIE_BORDER,
  width: BLINKIE_WIDTH - BLINKIE_BORDER * 2,
  height: BLINKIE_HEIGHT - BLINKIE_BORDER * 2,
};

export const SWATCH_FILL: Rgb = { r: 230, g: 226, b: 251 };

export const RAINBOW: Rgb[] = [
  { r: 255, g: 0, b: 77 },
  { r: 255, g: 140, b: 0 },
  { r: 255, g: 230, b: 0 },
  { r: 0, g: 200, b: 70 },
  { r: 0, g: 140, b: 255 },
  { r: 170, g: 0, b: 255 },
];

export const initialBlinkie: BlinkieDraft = {
  fill: "#ff3ea5",
  patternId: "dots",
  patternMotion: "blink",
  patternColor: "#7ff9ff",
  borderMotion: "pips",
  borderColor: "#1d1340",
  accentColor: "#7ff9ff",
  text: "hello world!",
  textColor: "#ffffff",
  outlineColor: "#1d1340",
  flashColor: "#7ff9ff",
  fontMotion: "flash",
  delay: 10,
};
