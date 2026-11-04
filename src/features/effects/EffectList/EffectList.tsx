import { useMemo } from "react";
import { ChoiceList } from "../../../components/ChoiceList/ChoiceList.tsx";
import { useUserbarDraft } from "../../../hooks/useUserbarDraft.ts";
import { hexToRgb } from "../../../utils/color.ts";
import { sampleSpacing } from "../../../utils/draft.ts";
import { patternSource } from "../../patterns/patternCatalog/patternCatalog.ts";
import { renderEffectSample } from "../preview/preview.ts";

const effects = [
  { id: "wave", label: "Wave" },
  { id: "glitch", label: "Glitch" },
  { id: "split", label: "Split" },
  { id: "pixelate", label: "Pixelate" },
  { id: "grain", label: "Grain" },
  { id: "posterize", label: "Posterize" },
  { id: "blur", label: "Blur" },
  { id: "motion", label: "Motion blur" },
  { id: "emboss", label: "Emboss" },
  { id: "warp", label: "Warp" },
  { id: "bulge", label: "Bulge" },
] as const;

function useEffectSample(id: string): ImageData {
  const { draft } = useUserbarDraft();
  return useMemo(
    () =>
      renderEffectSample(
        patternSource(draft.patternId),
        hexToRgb(draft.backgroundTop),
        hexToRgb(draft.backgroundBottom),
        { ...hexToRgb(draft.scanline.hex), a: draft.scanline.opacity / 100 },
        sampleSpacing(draft.scanlineSpacing),
        draft.scanlineFlip,
        id,
      ),
    [
      id,
      draft.patternId,
      draft.backgroundTop,
      draft.backgroundBottom,
      draft.scanline,
      draft.scanlineSpacing,
      draft.scanlineFlip,
    ],
  );
}

export function EffectList() {
  const { draft, toggleEffect } = useUserbarDraft();
  return (
    <ChoiceList
      label="Effects"
      items={effects}
      isSelected={(id) => draft.effectIds.includes(id)}
      onSelect={toggleEffect}
      badge={(id) => {
        const index = draft.effectIds.indexOf(id);
        return index < 0 ? undefined : index + 1;
      }}
      useSample={useEffectSample}
    />
  );
}
