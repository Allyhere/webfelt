import type { ReactNode } from "react";

export type SelectProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  /** SelectOption children. */
  children: ReactNode;
};
