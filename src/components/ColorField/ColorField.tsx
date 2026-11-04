import { useId } from "react";
import type { ColorDraft } from "../../types.ts";

type ColorFieldProps = {
  label: string;
  opacityLabel: string;
  color: ColorDraft;
  onChange: (color: ColorDraft) => void;
};

export function ColorField({ label, opacityLabel, color, onChange }: ColorFieldProps) {
  const colorId = useId();
  const opacityId = useId();
  return (
    <>
      <label htmlFor={colorId}>
        {label}{" "}
        <input
          id={colorId}
          type="color"
          value={color.hex}
          onChange={(event) => onChange({ ...color, hex: event.target.value })}
        />
      </label>
      <label htmlFor={opacityId}>
        {opacityLabel}{" "}
        <input
          id={opacityId}
          type="range"
          min={0}
          max={100}
          value={color.opacity}
          onChange={(event) =>
            onChange({ ...color, opacity: Number(event.target.value) })
          }
        />{" "}
        <output htmlFor={opacityId}>{color.opacity}%</output>
      </label>
    </>
  );
}
