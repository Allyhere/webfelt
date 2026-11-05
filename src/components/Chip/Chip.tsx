import { ToggleButton } from "react-aria-components";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { ChipProps } from "./Chip.types.ts";

export function Chip({
  isSelected,
  onChange,
  canvasRef,
  badge,
  compact = false,
  className = "",
  style,
  children,
}: ChipProps) {
  const box = compact ? "motion-chip gap-px p-px" : "size-full gap-tight p-tight";
  const swatch = compact ? "size-swatch-orbit" : "size-swatch";
  return (
    <ToggleButton
      isSelected={isSelected}
      onChange={onChange}
      style={style}
      className={`${box} grid min-w-0 cursor-pointer justify-items-center rounded-control border-2 border-dotted border-lavender-400 bg-paper font-body text-tiny text-grape-900 data-hovered:bg-lavender-100 data-pressed:translate-y-px data-selected:border-solid data-selected:border-pink-500 data-selected:bg-pink-100 data-focus-visible:focus-ring ${className}`}
    >
      <canvas ref={canvasRef} className={`pixelated rounded-control ${swatch}`} aria-hidden="true" />
      <span className="chip-label flex w-full min-w-0 items-center justify-center gap-tight text-center">
        {isSelected ? <Dingbat name="check" className="text-pink-500" /> : null}
        <span className="min-w-0">{children}</span>
        {isSelected && badge !== undefined ? (
          <span className="font-pixel text-title text-grape-900">{badge}</span>
        ) : null}
      </span>
    </ToggleButton>
  );
}
