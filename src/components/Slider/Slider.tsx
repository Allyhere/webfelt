import {
  Label,
  Slider as AriaSlider,
  SliderFill,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";
import type { SliderProps } from "./Slider.types.ts";

export function Slider({
  label,
  value,
  onChange,
  minValue = 0,
  maxValue = 100,
  unit = "",
}: SliderProps) {
  return (
    <AriaSlider
      value={value}
      onChange={(next) => onChange(Array.isArray(next) ? next[0] : next)}
      minValue={minValue}
      maxValue={maxValue}
      step={1}
      className="grid grid-cols-2 gap-x-choice gap-y-tight"
    >
      <Label className="text-label font-bold text-grape-700">{label}</Label>
      <SliderOutput className="text-right font-pixel text-title text-grape-900">
        {({ state }) => `${state.getThumbValue(0)}${unit}`}
      </SliderOutput>
      <SliderTrack className="relative col-span-2 flex h-control items-center">
        <div className="relative h-track w-full overflow-hidden rounded-pill border border-grape-700 bg-lavender-200">
          <SliderFill className="absolute bg-cobalt-500" />
        </div>
        <SliderThumb className="top-1/2 size-thumb cursor-grab rounded-pill border-2 border-grape-900 bg-paper shadow-sticker-soft data-dragging:cursor-grabbing data-dragging:bg-pink-100 data-focus-visible:focus-ring" />
      </SliderTrack>
    </AriaSlider>
  );
}
