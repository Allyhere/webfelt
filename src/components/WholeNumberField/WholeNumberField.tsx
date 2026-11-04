import { useId } from "react";
import { numberFromInput, numberInputValue } from "../../utils/draft.ts";

type WholeNumberFieldProps = {
  label: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
};

export function WholeNumberField({
  label,
  value,
  min,
  max,
  onChange,
}: WholeNumberFieldProps) {
  const id = useId();
  return (
    <label htmlFor={id}>
      {label}{" "}
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={1}
        value={numberInputValue(value)}
        onChange={(event) => onChange(numberFromInput(event.target.value))}
      />
    </label>
  );
}
