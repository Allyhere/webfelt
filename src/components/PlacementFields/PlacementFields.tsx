import { useId } from "react";
import type { Anchor, Placement } from "../../render/render.types.ts";

type PlacementFieldsProps = {
  legend: string;
  placement: Placement;
  onChange: (placement: Placement) => void;
};

function showsDistance(anchor: Anchor): boolean {
  return anchor !== "center";
}

function anchorFromSelect(value: string): Anchor {
  if (value === "start" || value === "center" || value === "end") return value;
  return "start";
}

export function PlacementFields({ legend, placement, onChange }: PlacementFieldsProps) {
  const horizontalId = useId();
  const verticalId = useId();
  const horizontalDistanceId = useId();
  const verticalDistanceId = useId();
  return (
    <fieldset>
      <legend>{legend}</legend>
      <label htmlFor={horizontalId}>
        Horizontal alignment{" "}
        <select
          id={horizontalId}
          value={placement.horizontal}
          onChange={(event) =>
            onChange({
              ...placement,
              horizontal: anchorFromSelect(event.target.value),
            })
          }
        >
          <option value="start">Left edge</option>
          <option value="center">Middle</option>
          <option value="end">Right edge</option>
        </select>
      </label>
      {showsDistance(placement.horizontal) ? (
        <label htmlFor={horizontalDistanceId}>
          Horizontal distance{" "}
          <input
            id={horizontalDistanceId}
            type="number"
            value={placement.horizontalDistance}
            onChange={(event) =>
              onChange({
                ...placement,
                horizontalDistance: Number(event.target.value),
              })
            }
          />
        </label>
      ) : null}
      <label htmlFor={verticalId}>
        Vertical alignment{" "}
        <select
          id={verticalId}
          value={placement.vertical}
          onChange={(event) =>
            onChange({
              ...placement,
              vertical: anchorFromSelect(event.target.value),
            })
          }
        >
          <option value="start">Top edge</option>
          <option value="center">Middle</option>
          <option value="end">Bottom edge</option>
        </select>
      </label>
      {showsDistance(placement.vertical) ? (
        <label htmlFor={verticalDistanceId}>
          Vertical distance{" "}
          <input
            id={verticalDistanceId}
            type="number"
            value={placement.verticalDistance}
            onChange={(event) =>
              onChange({
                ...placement,
                verticalDistance: Number(event.target.value),
              })
            }
          />
        </label>
      ) : null}
    </fieldset>
  );
}
