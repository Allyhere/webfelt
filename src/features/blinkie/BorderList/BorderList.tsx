import { useMemo } from "react";
import { ChoiceList } from "../../../components/ChoiceList/ChoiceList.tsx";
import { useBlinkieClock } from "../../../hooks/useBlinkieClock.ts";
import { useBlinkieDraft } from "../../../hooks/useBlinkieDraft.ts";
import type { BorderMotion } from "../../../render/blinkie/blinkie.types.ts";
import { paintBorderSwatch } from "../../../render/blinkie/border.ts";
import { hexToRgb } from "../../../utils/color.ts";

const borders = [
  { id: "still", label: "Still" },
  { id: "pips", label: "Pips" },
  { id: "march", label: "March" },
  { id: "bulbs", label: "Bulbs" },
  { id: "flash", label: "Flash" },
] as const satisfies readonly { id: BorderMotion; label: string }[];

function useBorderSample(id: BorderMotion): ImageData {
  const { draft } = useBlinkieDraft();
  const frame = useBlinkieClock();
  return useMemo(
    () => paintBorderSwatch(id, frame, hexToRgb(draft.borderColor), hexToRgb(draft.accentColor)),
    [id, frame, draft.borderColor, draft.accentColor],
  );
}

export function BorderList() {
  const { draft, update } = useBlinkieDraft();
  return (
    <ChoiceList
      label="Border"
      items={borders}
      isSelected={(id) => draft.borderMotion === id}
      onSelect={(id) => update({ borderMotion: id })}
      useSample={useBorderSample}
    />
  );
}
