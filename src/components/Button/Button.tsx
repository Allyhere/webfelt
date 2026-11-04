import { Button as AriaButton } from "react-aria-components";
import type { ButtonProps } from "./Button.types.ts";

export function Button({ variant = "default", className = "", children, ...props }: ButtonProps) {
  const face =
    variant === "primary"
      ? "bg-pink-500 text-paper data-hovered:bg-pink-600"
      : "bg-paper text-grape-900 data-hovered:bg-lavender-100";
  return (
    <AriaButton
      {...props}
      className={`inline-flex h-control cursor-pointer items-center justify-center gap-tight rounded-control border-2 border-grape-900 px-window font-pixel text-title shadow-sticker data-pressed:translate-x-px data-pressed:translate-y-px data-pressed:shadow-none data-focus-visible:focus-ring data-disabled:cursor-default data-disabled:border-lavender-400 data-disabled:bg-paper data-disabled:text-lavender-400 data-disabled:shadow-none ${face} ${className}`}
    >
      {children}
    </AriaButton>
  );
}
