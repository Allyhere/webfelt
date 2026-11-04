import { useMemo } from "react";
import { ChoiceList } from "../../../components/ChoiceList/ChoiceList.tsx";
import { useBlinkieClock } from "../../../hooks/useBlinkieClock.ts";
import { useBlinkieDraft } from "../../../hooks/useBlinkieDraft.ts";
import { paintPatternSwatch } from "../../../render/blinkie/pattern.ts";
import { patternSource } from "../../patterns/patternCatalog/patternCatalog.ts";
import { renderPatternSample } from "../../patterns/svgPattern/svgPattern.ts";
import { hexToRgb } from "../../../utils/color.ts";

const patterns = [
  { id: "none", label: "None" },
  { id: "diagonal", label: "Diagonal" },
  { id: "other-diagonal", label: "Other diagonal" },
  { id: "horizontal", label: "Horizontal" },
  { id: "vertical", label: "Vertical" },
  { id: "grid", label: "Grid" },
  { id: "checker", label: "Checker" },
  { id: "dots", label: "Dots" },
  { id: "brick", label: "Brick" },
  { id: "circles", label: "Circles" },
  { id: "slash", label: "Slash" },
  { id: "glitter", label: "Glitter" },
] as const;

function usePatternSample(id: string): ImageData {
  const { draft } = useBlinkieDraft();
  const frame = useBlinkieClock();
  const animated = id === "none" || id === "glitter";
  return useMemo(() => {
    const fill = hexToRgb(draft.fill);
    const ink = hexToRgb(draft.patternColor);
    if (animated) return paintPatternSwatch(id, "still", frame, fill, ink);
    return renderPatternSample(patternSource(id), fill, fill, { ...ink, a: 1 }, 4, false);
  }, [id, draft.fill, draft.patternColor, animated, frame]);
}

export function BlinkiePatternList() {
  const { draft, update } = useBlinkieDraft();
  return (
    <ChoiceList
      label="Pattern"
      items={patterns}
      isSelected={(id) => draft.patternId === id}
      onSelect={(id) => update({ patternId: id })}
      useSample={usePatternSample}
    />
  );
}
