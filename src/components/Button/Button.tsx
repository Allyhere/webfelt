import { Button as AriaButton } from "react-aria-components";
import type { ButtonProps } from "./Button.types.ts";

export function Button({ variant = "default", className = "", children, ...props }: ButtonProps) {
  const face =
    variant === "primary"
      ? "bg-titlebar text-chrome-light data-hovered:brightness-110"
      : "bg-chrome-mid text-grape-900 data-hovered:bg-lavender-100";
  return (
    <AriaButton
      {...props}
      className={`inline-flex h-control cursor-pointer items-center justify-center gap-tight border border-grape-900 px-window font-pixel text-title shadow-bevel data-pressed:translate-y-px data-pressed:shadow-bevel-in data-focus-visible:focus-ring data-disabled:cursor-default data-disabled:text-chrome-dark data-disabled:brightness-100 ${face} ${className}`}
    >
      {children}
    </AriaButton>
  );
}
