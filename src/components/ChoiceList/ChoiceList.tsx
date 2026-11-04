import { useRef } from "react";
import { useCanvasPaint } from "../../hooks/useCanvasPaint.ts";
import { Chip } from "../Chip/Chip.tsx";
import type { ChoiceListProps } from "./ChoiceList.types.ts";

function Choice<Id extends string>({
  id,
  label,
  selected,
  onSelect,
  badge,
  useSample,
}: {
  id: Id;
  label: string;
  selected: boolean;
  onSelect: (id: Id) => void;
  badge?: number;
  useSample: (id: Id) => ImageData | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sample = useSample(id);
  useCanvasPaint(canvasRef, sample);

  return (
    <li>
      <Chip
        isSelected={selected}
        onChange={() => onSelect(id)}
        canvasRef={canvasRef}
        badge={badge}
      >
        {label}
      </Chip>
    </li>
  );
}

export function ChoiceList<Id extends string>({
  label,
  items,
  isSelected,
  onSelect,
  badge,
  useSample,
}: ChoiceListProps<Id>) {
  return (
    <ul aria-label={label} className="choice-grid m-0 list-none p-0">
      {items.map((item) => (
        <Choice
          key={item.id}
          id={item.id}
          label={item.label}
          selected={isSelected(item.id)}
          onSelect={onSelect}
          badge={badge?.(item.id)}
          useSample={useSample}
        />
      ))}
    </ul>
  );
}
