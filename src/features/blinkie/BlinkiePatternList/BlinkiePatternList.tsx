import { useEffect, useMemo, useRef, useState } from "react";
import { ChoiceList } from "../../../components/ChoiceList/ChoiceList.tsx";
import { useBlinkieClock } from "../../../hooks/useBlinkieClock.ts";
import { useBlinkieDraft } from "../../../hooks/useBlinkieDraft.ts";
import { paintPatternSwatch } from "../../../render/blinkie/pattern.ts";
import { PatternMotionList } from "../PatternMotionList/PatternMotionList.tsx";
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
  { id: "big-dots", label: "Big dots" },
  { id: "plus", label: "Plus" },
  { id: "star", label: "Star" },
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

function hasMotion(id: string): boolean {
  return id !== "none" && id !== "glitter";
}

export function BlinkiePatternList() {
  const { draft, update } = useBlinkieDraft();
  const [openId, setOpenId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openId) return;
    function dismiss(event: Event) {
      const target = event.target;
      if (target instanceof Node && listRef.current?.contains(target)) return;
      setOpenId(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }
    document.addEventListener("pointerdown", dismiss, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", dismiss, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  return (
    <div ref={listRef} className="contents">
      <ChoiceList
        label="Pattern"
        items={patterns}
        isSelected={(id) => draft.patternId === id}
        onSelect={(id) => {
          update({ patternId: id });
          if (!hasMotion(id)) {
            setOpenId(null);
            return;
          }
          setOpenId((current) => (current === id ? null : id));
        }}
        useSample={usePatternSample}
        anchorSelected
        renderExtra={(id) =>
          openId === id ? <PatternMotionList onPick={() => setOpenId(null)} /> : null
        }
      />
    </div>
  );
}
