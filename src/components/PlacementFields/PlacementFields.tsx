import type { Anchor, Placement } from "../../render/render.types.ts";
import { NumberField } from "../NumberField/NumberField.tsx";
import { Select } from "../Select/Select.tsx";
import { SelectOption } from "../SelectOption/SelectOption.tsx";
import type { PlacementFieldsProps } from "./PlacementFields.types.ts";

function showsDistance(anchor: Anchor): boolean {
  return anchor !== "center";
}

export function PlacementFields({ legend, placement, onChange }: PlacementFieldsProps) {
  const set = (partial: Partial<Placement>) => onChange({ ...placement, ...partial });
  return (
    <fieldset className="grid gap-row border-t border-dotted border-lavender-400 pt-row">
      <legend className="pr-choice text-label font-bold text-grape-700">{legend}</legend>
      <div className="grid grid-cols-2 items-start gap-choice">
        <Select<Anchor>
          label="Horizontal"
          value={placement.horizontal}
          onChange={(horizontal) => set({ horizontal })}
        >
          <SelectOption id="start">Left edge</SelectOption>
          <SelectOption id="center">Middle</SelectOption>
          <SelectOption id="end">Right edge</SelectOption>
        </Select>
        {showsDistance(placement.horizontal) ? (
          <NumberField
            label="Distance"
            value={placement.horizontalDistance}
            onChange={(horizontalDistance) => set({ horizontalDistance })}
          />
        ) : null}
      </div>
      <div className="grid grid-cols-2 items-start gap-choice">
        <Select<Anchor>
          label="Vertical"
          value={placement.vertical}
          onChange={(vertical) => set({ vertical })}
        >
          <SelectOption id="start">Top edge</SelectOption>
          <SelectOption id="center">Middle</SelectOption>
          <SelectOption id="end">Bottom edge</SelectOption>
        </Select>
        {showsDistance(placement.vertical) ? (
          <NumberField
            label="Distance"
            value={placement.verticalDistance}
            onChange={(verticalDistance) => set({ verticalDistance })}
          />
        ) : null}
      </div>
    </fieldset>
  );
}
