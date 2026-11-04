import { ColorField } from "../ColorField/ColorField.tsx";
import { Slider } from "../Slider/Slider.tsx";
import type { TintFieldProps } from "./TintField.types.ts";

export function TintField({ label, opacityLabel, value, onChange }: TintFieldProps) {
  return (
    <div className="grid gap-row">
      <ColorField
        label={label}
        value={value.hex}
        onChange={(hex) => onChange({ ...value, hex })}
      />
      <Slider
        label={opacityLabel}
        value={value.opacity}
        onChange={(opacity) => onChange({ ...value, opacity })}
        unit="%"
      />
    </div>
  );
}
