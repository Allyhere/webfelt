import type { RefObject } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { BadgeShape, GradientAxis } from "./render/badge/badgeShape.types.ts";
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
  gradientAxis: GradientAxis;
  shape: BadgeShape;
  bevel: boolean;
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

/** The part of the draft that React Hook Form holds. The image stays out of the form. */
export type DraftFields = Omit<Draft, "backgroundImage">;

type PreviewSize = {
  width: number;
  height: number;
};

export type UserbarEditor = {
  draft: Draft;
  form: UseFormReturn<DraftFields>;
  update: (partial: Partial<DraftFields>) => void;
  alertMessage: string;
  previewSize: PreviewSize;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  save: () => void;
  canSave: boolean;
  storeImage: (file: File, failureMessage: string) => void;
  clearImage: () => void;
  toggleEffect: (id: string) => void;
};
