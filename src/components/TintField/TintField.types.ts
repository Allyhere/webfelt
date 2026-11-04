import type { ColorDraft } from "../../types.ts";

export type TintFieldProps = {
  label: string;
  opacityLabel: string;
  value: ColorDraft;
  onChange: (value: ColorDraft) => void;
};
