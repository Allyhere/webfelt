import { useMemo } from "react";
import { ChoiceList } from "../../../components/ChoiceList/ChoiceList.tsx";
import { useUserbarDraft } from "../../../hooks/useUserbarDraft.ts";
import { hexToRgb } from "../../../utils/color.ts";
import { sampleSpacing } from "../../../utils/draft.ts";
import { patternSource } from "../patternCatalog/patternCatalog.ts";
import { renderPatternSample } from "../svgPattern/svgPattern.ts";

const patterns = [
  { id: "diagonal", label: "Diagonal" },
  { id: "other-diagonal", label: "Other diagonal" },
  { id: "horizontal", label: "Horizontal" },
  { id: "vertical", label: "Vertical" },
  { id: "grid", label: "Grid" },
  { id: "checker", label: "Checker" },
  { id: "dots", label: "Dots" },
  { id: "big-dots", label: "Big dots" },
  { id: "plus", label: "Plus" },
  { id: "star", label: "Star" },
  { id: "brick", label: "Brick" },
  { id: "circles", label: "Circles" },
  { id: "slash", label: "Slash" },
] as const;

function usePatternSample(id: string): ImageData {
  const { draft } = useUserbarDraft();
  return useMemo(
    () =>
      renderPatternSample(
        patternSource(id),
        hexToRgb(draft.backgroundTop),
        hexToRgb(draft.backgroundBottom),
        { ...hexToRgb(draft.scanline.hex), a: 1 },
        sampleSpacing(draft.scanlineSpacing),
        draft.scanlineFlip,
      ),
    [
      id,
      draft.backgroundTop,
      draft.backgroundBottom,
      draft.scanline,
      draft.scanlineSpacing,
      draft.scanlineFlip,
    ],
  );
}

export function PatternList() {
  const { draft, update } = useUserbarDraft();
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
