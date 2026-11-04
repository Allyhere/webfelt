import { ToggleButton } from "react-aria-components";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { ChipProps } from "./Chip.types.ts";

export function Chip({ isSelected, onChange, canvasRef, badge, children }: ChipProps) {
  return (
    <ToggleButton
      isSelected={isSelected}
      onChange={onChange}
      className="grid cursor-pointer justify-items-center gap-tight border border-grape-700 bg-lavender-50 p-tight font-body text-tiny text-grape-900 shadow-bevel-flat data-hovered:bg-lavender-100 data-pressed:shadow-bevel-in data-selected:border-pink-500 data-selected:bg-pink-100 data-focus-visible:focus-ring"
    >
      <canvas ref={canvasRef} className="pixelated size-swatch" aria-hidden="true" />
      <span className="flex items-center gap-tight">
        {isSelected ? <Dingbat name="check" className="text-pink-500" /> : null}
        <span>{children}</span>
        {isSelected && badge !== undefined ? (
          <span className="font-pixel text-title text-grape-900">{badge}</span>
        ) : null}
      </span>
    </ToggleButton>
  );
}
