import { Checkbox as AriaCheckbox } from "react-aria-components";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { CheckboxProps } from "./Checkbox.types.ts";

export function Checkbox({ isSelected, onChange, children }: CheckboxProps) {
  return (
    <AriaCheckbox
      isSelected={isSelected}
      onChange={onChange}
      className="group flex min-h-control cursor-pointer items-center gap-choice font-body text-body text-grape-900"
    >
      {({ isSelected: checked }) => (
        <>
          <span
            aria-hidden="true"
            className="grid size-check shrink-0 place-items-center rounded-control border border-grape-700 bg-paper inset-shadow-soft group-data-hovered:bg-lavender-100 group-data-focus-visible:focus-ring"
          >
            {checked ? <Dingbat name="check" className="text-label" /> : null}
          </span>
          <span>{children}</span>
        </>
      )}
    </AriaCheckbox>
  );
}
