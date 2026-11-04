import {
  Button,
  Label,
  ListBox,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from "react-aria-components";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { SelectProps } from "./Select.types.ts";

export function Select<T extends string>({ label, value, onChange, children }: SelectProps<T>) {
  return (
    <AriaSelect
      selectedKey={value}
      onSelectionChange={(key) => {
        if (typeof key === "string") onChange(key as T);
      }}
      className="grid min-w-0 gap-tight"
    >
      <Label className="text-label font-bold text-grape-700">
        {label}
      </Label>
      <Button className="flex h-control w-full cursor-pointer items-center justify-between gap-choice border border-grape-900 bg-chrome-mid px-tight text-left font-body text-body text-grape-900 shadow-bevel data-hovered:bg-lavender-100 data-pressed:shadow-bevel-in data-focus-visible:focus-ring">
        <SelectValue className="truncate" />
        <Dingbat name="arrow" className="rotate-90 text-grape-700" />
      </Button>
      <Popover className="popover-width border border-grape-900 bg-lavender-50 shadow-bevel">
        <ListBox className="grid outline-none">{children}</ListBox>
      </Popover>
    </AriaSelect>
  );
}
