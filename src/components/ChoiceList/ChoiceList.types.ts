import type { ReactNode } from "react";

export type ChoiceItem<Id extends string> = {
  id: Id;
  label: string;
};

export type ChoiceListProps<Id extends string> = {
  label: string;
  items: readonly ChoiceItem<Id>[];
  isSelected: (id: Id) => boolean;
  onSelect: (id: Id) => void;
  badge?: (id: Id) => number | undefined;
  useSample: (id: Id) => ImageData | null;
  /** Marks the selected chip as the anchor for floating options. */
  anchorSelected?: boolean;
  /** Extra controls rendered inside the selected chip's cell. */
  renderExtra?: (id: Id) => ReactNode;
};
