import { useMemo } from "react";
import { ChoiceList } from "../../../components/ChoiceList/ChoiceList.tsx";
import { useBlinkieDraft } from "../../../hooks/useBlinkieDraft.ts";
import { paintFormatSwatch } from "../../../render/blinkie/format.ts";
import type { BlinkieFormat } from "../../../render/blinkie/blinkie.types.ts";
import { hexToRgb } from "../../../utils/color.ts";

const formats = [
  { id: "blinkie", label: "Blinkie" },
  { id: "badge", label: "Badge" },
  { id: "stamp", label: "Stamp" },
] as const satisfies readonly { id: BlinkieFormat; label: string }[];

function useFormatSample(id: BlinkieFormat): ImageData {
  const { draft } = useBlinkieDraft();
  return useMemo(
    () => paintFormatSwatch(id, hexToRgb(draft.fill), hexToRgb(draft.borderColor)),
    [id, draft.fill, draft.borderColor],
  );
}

export function FormatList() {
  const { draft, update } = useBlinkieDraft();
  return (
    <ChoiceList
      label="Format"
      items={formats}
      isSelected={(id) => draft.format === id}
      onSelect={(id) => update({ format: id })}
      useSample={useFormatSample}
    />
  );
}
