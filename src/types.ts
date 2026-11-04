import type { RefObject } from "react";
import type { Placement } from "./render/render.types.ts";

export type ColorDraft = {
  hex: string;
  opacity: number;
};

export type Draft = {
  width: number;
  height: number;
  backgroundTop: string;
  backgroundBottom: string;
  text: string;
  textColor: ColorDraft;
  outlineColor: ColorDraft;
  textPlacement: Placement;
  gloss: ColorDraft;
  border: ColorDraft;
  patternId: string;
  effectIds: string[];
  scanline: ColorDraft;
  scanlineFlip: boolean;
  scanlineSpacing: number;
  backgroundImage: ImageData | null;
  imagePlacement: Placement;
};

type PreviewSize = {
  width: number;
  height: number;
};

export type UserbarEditor = {
  draft: Draft;
  update: (partial: Partial<Draft>) => void;
  alertMessage: string;
  previewSize: PreviewSize;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  fileRef: RefObject<HTMLInputElement | null>;
  save: () => void;
  canSave: boolean;
  storeImage: (file: File, failureMessage: string) => void;
  toggleEffect: (id: string) => void;
};
