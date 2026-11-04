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
      <Label className="text-label font-bold text-grape-700">{label}</Label>
      <Button className="flex h-control w-full cursor-pointer items-center justify-between gap-choice rounded-control border border-grape-700 bg-paper px-choice text-left font-body text-body text-grape-900 inset-shadow-soft data-hovered:bg-lavender-100 data-pressed:bg-lavender-100 data-focus-visible:focus-ring">
        <SelectValue className="truncate" />
        <Dingbat name="arrow" className="rotate-90 text-lavender-400" />
      </Button>
      <Popover className="popover-width overflow-hidden rounded-control border border-grape-700 bg-paper shadow-sticker">
        <ListBox className="grid outline-none">{children}</ListBox>
      </Popover>
    </AriaSelect>
  );
}
