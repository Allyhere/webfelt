import type { Placement } from "../../render/render.types.ts";

export type PlacementFieldsProps = {
  legend: string;
  placement: Placement;
  onChange: (placement: Placement) => void;
};
