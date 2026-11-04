import { ListBoxItem } from "react-aria-components";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { SelectOptionProps } from "./SelectOption.types.ts";

export function SelectOption({ id, children }: SelectOptionProps) {
  return (
    <ListBoxItem
      id={id}
      textValue={children}
      className="flex min-h-option cursor-pointer items-center justify-between gap-choice px-choice font-body text-body text-grape-900 outline-none data-focused:bg-cobalt-500 data-focused:text-chrome-light data-selected:font-bold"
    >
      {({ isSelected }) => (
        <>
          <span>{children}</span>
          {isSelected ? <Dingbat name="check" /> : null}
        </>
      )}
    </ListBoxItem>
  );
}
