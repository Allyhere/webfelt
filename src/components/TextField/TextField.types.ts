import type { Ref } from "react";

export type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  errorMessage?: string;
  inputRef?: Ref<HTMLInputElement>;
};
