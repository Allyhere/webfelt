import type { Ref } from "react";

export type ColorFieldProps = {
  label: string;
  /** Six digit hex color such as #ff3ea5. */
  value: string;
  onChange: (hex: string) => void;
  triggerRef?: Ref<HTMLButtonElement>;
};
