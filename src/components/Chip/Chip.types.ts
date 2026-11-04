import type { RefObject } from "react";

export type ChipProps = {
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** Shown after the check when selected, for example an effect's order. */
  badge?: number;
  children: string;
};
