import type { Draft } from "./types.ts";

export const MAX_WIDTH = 2000;
export const MAX_HEIGHT = 200;
export const SAMPLE_SPACING = 4;

export const initialDraft: Draft = {
  width: 350,
  height: 19,
  backgroundTop: "#0000ff",
  backgroundBottom: "#80ffff",
  text: "hello world!",
  textColor: { hex: "#ffffff", opacity: 100 },
  outlineColor: { hex: "#000000", opacity: 100 },
  textPlacement: {
    horizontal: "end",
    horizontalDistance: 7,
    vertical: "center",
    verticalDistance: 0,
  },
  gloss: { hex: "#ffffff", opacity: 16 },
  border: { hex: "#000000", opacity: 100 },
  patternId: "diagonal",
  effectIds: [],
  scanline: { hex: "#000000", opacity: 71 },
  scanlineFlip: false,
  scanlineSpacing: 4,
  backgroundImage: null,
  imagePlacement: {
    horizontal: "start",
    horizontalDistance: 7,
    vertical: "center",
    verticalDistance: 0,
  },
};
