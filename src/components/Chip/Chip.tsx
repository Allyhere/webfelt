import { ToggleButton } from "react-aria-components";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { ChipProps } from "./Chip.types.ts";

export function Chip({ isSelected, onChange, canvasRef, badge, children }: ChipProps) {
  return (
    <ToggleButton
      isSelected={isSelected}
      onChange={onChange}
      className="grid size-full min-w-0 cursor-pointer justify-items-center gap-tight rounded-control border-2 border-dotted border-lavender-400 bg-paper p-tight font-body text-tiny text-grape-900 data-hovered:bg-lavender-100 data-pressed:translate-y-px data-selected:border-solid data-selected:border-pink-500 data-selected:bg-pink-100 data-focus-visible:focus-ring"
    >
      <canvas ref={canvasRef} className="pixelated size-swatch rounded-control" aria-hidden="true" />
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
