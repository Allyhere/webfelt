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
};
