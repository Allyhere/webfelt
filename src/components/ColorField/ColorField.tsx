import { useId } from "react";
import {
  Button,
  ColorArea,
  ColorField as AriaColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorThumb,
  Dialog,
  DialogTrigger,
  Input,
  Label,
  Popover,
  SliderTrack,
  parseColor,
} from "react-aria-components";
import type { ColorFieldProps } from "./ColorField.types.ts";

export function ColorField({ label, value, onChange, triggerRef }: ColorFieldProps) {
  const labelId = useId();
  const valueId = useId();
  return (
    <ColorPicker
      value={parseColor(value)}
      onChange={(color) => onChange(color.toString("hex"))}
    >
      <div className="grid min-w-0 gap-tight">
        <span
          id={labelId}
          className="text-label font-bold text-grape-700"
        >
          {label}
        </span>
        <DialogTrigger>
          <Button
            ref={triggerRef}
            aria-labelledby={`${labelId} ${valueId}`}
            className="flex h-control w-full cursor-pointer items-center gap-choice border border-grape-700 bg-lavender-50 px-tight text-left font-body text-body text-grape-900 shadow-bevel-in data-hovered:bg-lavender-100 data-focus-visible:focus-ring"
          >
            <ColorSwatch className="size-check shrink-0 border border-grape-900 shadow-bevel-flat" />
            <span id={valueId} className="uppercase">
              {value}
            </span>
          </Button>
          <Popover
            placement="bottom start"
            className="border border-grape-900 bg-lavender-50 shadow-bevel"
          >
            <Dialog aria-label={`${label} picker`} className="grid gap-row p-window outline-none">
              <ColorArea
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
                className="size-color-area border border-grape-900 shadow-bevel-in"
              >
                <ColorThumb className="size-thumb rounded-pill border-2 border-chrome-light shadow-bevel-flat data-focus-visible:focus-ring" />
              </ColorArea>
              <ColorSlider colorSpace="hsb" channel="hue" className="grid gap-tight">
                <Label className="text-label font-bold text-grape-700">
                  Hue
                </Label>
                <SliderTrack className="h-track w-color-area border border-grape-900 shadow-bevel-in">
                  <ColorThumb className="top-1/2 size-thumb rounded-pill border-2 border-chrome-light shadow-bevel-flat data-focus-visible:focus-ring" />
                </SliderTrack>
              </ColorSlider>
              <AriaColorField className="grid gap-tight">
                <Label className="text-label font-bold text-grape-700">
                  Hex
                </Label>
                <Input className="h-control w-color-area border border-grape-700 bg-lavender-50 px-tight font-body text-body text-grape-900 uppercase shadow-bevel-in data-focus-visible:focus-ring" />
              </AriaColorField>
            </Dialog>
          </Popover>
        </DialogTrigger>
      </div>
    </ColorPicker>
  );
}
