import type { UseFormReturn } from "react-hook-form";

export type BorderMotion = "still" | "pips" | "march" | "bulbs" | "flash";

export type PatternMotion = "still" | "crawl" | "blink";

export type FontMotion = "still" | "blink" | "flash" | "pulse" | "chase" | "rainbow";

export type BlinkieDraft = {
  fill: string;
  patternId: string;
  patternMotion: PatternMotion;
  patternColor: string;
  borderMotion: BorderMotion;
  borderColor: string;
  accentColor: string;
  text: string;
  textColor: string;
  outlineColor: string;
  flashColor: string;
  fontMotion: FontMotion;
  delay: number;
};

export type BlinkieFrames = {
  frames: ImageData[];
  textFits: boolean;
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BlinkieEditor = {
  draft: BlinkieDraft;
  form: UseFormReturn<BlinkieDraft>;
  update: (partial: Partial<BlinkieDraft>) => void;
  frames: ImageData[];
  textFits: boolean;
  canSave: boolean;
  save: () => void;
};
