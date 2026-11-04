import { useEffect, useState } from "react";
import { ChoiceList } from "../../../components/ChoiceList/ChoiceList.tsx";
import { useBlinkieClock } from "../../../hooks/useBlinkieClock.ts";
import { useBlinkieDraft } from "../../../hooks/useBlinkieDraft.ts";
import type { FontMotion } from "../../../render/blinkie/blinkie.types.ts";
import { paintFontSwatch } from "../../../render/blinkie/textFlash.ts";
import { hexToRgb } from "../../../utils/color.ts";

const fonts = [
  { id: "still", label: "Still" },
  { id: "blink", label: "Blink" },
  { id: "flash", label: "Flash" },
  { id: "pulse", label: "Pulse" },
  { id: "chase", label: "Chase" },
  { id: "rainbow", label: "Rainbow" },
] as const satisfies readonly { id: FontMotion; label: string }[];

function useFontSample(id: FontMotion): ImageData | null {
  const { draft } = useBlinkieDraft();
  const frame = useBlinkieClock();
  const [sample, setSample] = useState<ImageData | null>(null);

  useEffect(() => {
    let cancelled = false;
    void paintFontSwatch(
      "Aa",
      id,
      frame,
      hexToRgb(draft.textColor),
      hexToRgb(draft.outlineColor),
      hexToRgb(draft.flashColor),
    ).then((image) => {
      if (!cancelled) setSample(image);
    });
    return () => {
      cancelled = true;
    };
  }, [id, frame, draft.textColor, draft.outlineColor, draft.flashColor]);

  return sample;
}

export function FontList() {
  const { draft, update } = useBlinkieDraft();
  return (
    <ChoiceList
      label="Font"
      items={fonts}
      isSelected={(id) => draft.fontMotion === id}
      onSelect={(id) => update({ fontMotion: id })}
      useSample={useFontSample}
    />
  );
}
