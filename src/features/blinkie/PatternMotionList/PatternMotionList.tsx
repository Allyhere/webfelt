import { useMemo } from "react";
import { ChoiceList } from "../../../components/ChoiceList/ChoiceList.tsx";
import { useBlinkieClock } from "../../../hooks/useBlinkieClock.ts";
import { useBlinkieDraft } from "../../../hooks/useBlinkieDraft.ts";
import type { PatternMotion } from "../../../render/blinkie/blinkie.types.ts";
import { paintPatternSwatch } from "../../../render/blinkie/pattern.ts";
import { hexToRgb } from "../../../utils/color.ts";

const motions = [
  { id: "still", label: "Still" },
  { id: "crawl", label: "Crawl" },
  { id: "blink", label: "Blink" },
] as const satisfies readonly { id: PatternMotion; label: string }[];

function useMotionSample(id: PatternMotion): ImageData {
  const { draft } = useBlinkieDraft();
  const frame = useBlinkieClock();
  return useMemo(
    () =>
      paintPatternSwatch(
        draft.patternId,
        id,
        frame,
        hexToRgb(draft.fill),
        hexToRgb(draft.patternColor),
      ),
    [draft.patternId, id, frame, draft.fill, draft.patternColor],
  );
}

export function PatternMotionList() {
  const { draft, update } = useBlinkieDraft();
  return (
    <ChoiceList
      label="Pattern motion"
      items={motions}
      isSelected={(id) => draft.patternMotion === id}
      onSelect={(id) => update({ patternMotion: id })}
      useSample={useMotionSample}
    />
  );
}
