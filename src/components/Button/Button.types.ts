import type { ReactNode } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";

export type ButtonProps = Omit<AriaButtonProps, "className" | "children"> & {
  variant?: "default" | "primary";
  className?: string;
  children: ReactNode;
};
