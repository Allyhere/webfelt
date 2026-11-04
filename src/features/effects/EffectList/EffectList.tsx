import { useMemo, useRef } from "react";
import { useCanvasPaint } from "../../../hooks/useCanvasPaint.ts";
import { useUserbarDraft } from "../../../hooks/useUserbarDraft.ts";
import { renderEffectSample } from "../preview/preview.ts";
import { patternSource } from "../../patterns/patternCatalog/patternCatalog.ts";
import { Chip } from "../../../components/Chip/Chip.tsx";
import { hexToRgb } from "../../../utils/color.ts";
import { sampleSpacing } from "../../../utils/draft.ts";

type EffectChoiceProps = {
  id: string;
  children: string;
};

function EffectChoice({ id, children }: EffectChoiceProps) {
  const { draft, toggleEffect } = useUserbarDraft();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selected = draft.effectIds.includes(id);
  const order = draft.effectIds.indexOf(id) + 1;
  const sample = useMemo(
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
  useCanvasPaint(canvasRef, sample);

  return (
    <li>
      <Chip
        isSelected={selected}
        onChange={() => toggleEffect(id)}
        canvasRef={canvasRef}
        badge={order}
      >
        {children}
      </Chip>
    </li>
  );
}

export function EffectList() {
  return (
    <ul aria-label="Effects" className="m-0 flex list-none flex-wrap gap-choice p-0">
      <EffectChoice id="wave">Wave</EffectChoice>
      <EffectChoice id="glitch">Glitch</EffectChoice>
      <EffectChoice id="split">Split</EffectChoice>
      <EffectChoice id="pixelate">Pixelate</EffectChoice>
      <EffectChoice id="grain">Grain</EffectChoice>
      <EffectChoice id="posterize">Posterize</EffectChoice>
      <EffectChoice id="blur">Blur</EffectChoice>
      <EffectChoice id="motion">Motion blur</EffectChoice>
      <EffectChoice id="emboss">Emboss</EffectChoice>
      <EffectChoice id="warp">Warp</EffectChoice>
      <EffectChoice id="bulge">Bulge</EffectChoice>
    </ul>
  );
}
