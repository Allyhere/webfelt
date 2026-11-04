import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  NumberField as AriaNumberField,
} from "react-aria-components";
import type { NumberFieldProps } from "./NumberField.types.ts";

export function NumberField({
  label,
  value,
  onChange,
  minValue,
  maxValue,
  errorMessage,
  inputRef,
}: NumberFieldProps) {
  return (
    <AriaNumberField
      value={value}
      onChange={onChange}
      minValue={minValue}
      maxValue={maxValue}
      step={1}
      formatOptions={{ maximumFractionDigits: 0, useGrouping: false }}
      isInvalid={Boolean(errorMessage)}
      className="grid min-w-0 gap-tight"
    >
      <Label className="text-label font-bold text-grape-700">
        {label}
      </Label>
      <Group className="flex h-control min-w-0 border border-grape-700 bg-lavender-50 shadow-bevel-in data-focus-within:focus-ring data-invalid:border-danger-700 data-invalid:bg-danger-100">
        <Button
          slot="decrement"
          className="w-control shrink-0 cursor-pointer border-r border-grape-700 bg-chrome-mid font-pixel text-title text-grape-900 data-hovered:bg-lavender-100 data-pressed:shadow-bevel-in data-disabled:cursor-default data-disabled:text-chrome-dark"
        >
          -
        </Button>
        <Input
          ref={inputRef}
          className="w-full min-w-0 flex-1 bg-transparent px-tight text-center font-body text-body text-grape-900 outline-none"
        />
        <Button
          slot="increment"
          className="w-control shrink-0 cursor-pointer border-l border-grape-700 bg-chrome-mid font-pixel text-title text-grape-900 data-hovered:bg-lavender-100 data-pressed:shadow-bevel-in data-disabled:cursor-default data-disabled:text-chrome-dark"
        >
          +
        </Button>
      </Group>
      <FieldError className="text-tiny text-danger-700">{errorMessage}</FieldError>
    </AriaNumberField>
  );
}
