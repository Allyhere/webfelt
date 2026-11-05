import type { CSSProperties, RefObject } from "react";

export type ChipProps = {
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** Shown after the check when selected, for example an effect's order. */
  badge?: number;
  /** Smaller chip anchored beside another chip. */
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
  children: string;
};
