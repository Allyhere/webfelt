import {
  FieldError,
  Input,
  Label,
  Text,
  TextField as AriaTextField,
} from "react-aria-components";
import type { TextFieldProps } from "./TextField.types.ts";

export function TextField({
  label,
  value,
  onChange,
  description,
  errorMessage,
  inputRef,
}: TextFieldProps) {
  return (
    <AriaTextField
      value={value}
      onChange={onChange}
      isInvalid={Boolean(errorMessage)}
      className="grid min-w-0 gap-tight"
    >
      <Label className="text-label font-bold text-grape-700">{label}</Label>
      <Input
        ref={inputRef}
        className="h-control w-full rounded-control border border-grape-700 bg-paper px-choice font-body text-body text-grape-900 inset-shadow-soft data-focus-visible:focus-ring data-invalid:border-danger-700 data-invalid:bg-danger-100"
      />
      {description ? (
        <Text slot="description" className="text-tiny text-grape-700">
          {description}
        </Text>
      ) : null}
      <FieldError className="text-tiny text-danger-700">{errorMessage}</FieldError>
    </AriaTextField>
  );
}
