import type { Ref } from "react";

export type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  errorMessage?: string;
  inputRef?: Ref<HTMLInputElement>;
};
