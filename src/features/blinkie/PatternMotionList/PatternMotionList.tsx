import { useMemo, useRef, useState, type CSSProperties } from "react";
import { Chip } from "../../../components/Chip/Chip.tsx";
import { useBlinkieClock } from "../../../hooks/useBlinkieClock.ts";
import { useBlinkieDraft } from "../../../hooks/useBlinkieDraft.ts";
import { useCanvasPaint } from "../../../hooks/useCanvasPaint.ts";
import type { PatternMotion } from "../../../render/blinkie/blinkie.types.ts";
import { paintPatternSwatch } from "../../../render/blinkie/pattern.ts";
import { hexToRgb } from "../../../utils/color.ts";

const motions = [
  { id: "still", label: "Still" },
  { id: "crawl", label: "Crawl" },
  { id: "blink", label: "Blink" },
] as const satisfies readonly { id: PatternMotion; label: string }[];

const above = ["orbit-above-right", "orbit-above-left"] as const;
const beside = ["orbit-side", "orbit-side-high"] as const;
const below = ["orbit-below-left", "orbit-below-right"] as const;

function pick(slots: readonly string[]): string {
  return slots[Math.floor(Math.random() * slots.length)] ?? slots[0] ?? "";
}

function orbitPlaces(): string[] {
  const places = [pick(above), pick(beside), pick(below)];
  for (let index = places.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const current = places[index] ?? "";
    places[index] = places[swap] ?? "";
    places[swap] = current;
  }
  return places;
}

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

function MotionChip({
  id,
  label,
  place,
  delay,
}: {
  id: PatternMotion;
  label: string;
  place: string;
  delay: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sample = useMotionSample(id);
  useCanvasPaint(canvasRef, sample);
  const { draft, update } = useBlinkieDraft();
  const [direction] = useState(
    () =>
      ({
        "--orbit-lean": Math.random() < 0.5 ? "-1" : "1",
        animationDelay: delay,
      }) as CSSProperties,
  );
  return (
    <Chip
      compact
      className={place}
      style={direction}
      isSelected={draft.patternMotion === id}
      onChange={() => update({ patternMotion: id })}
      canvasRef={canvasRef}
    >
      {label}
    </Chip>
  );
}

export function PatternMotionList() {
  const [places] = useState(orbitPlaces);
  return (
    <div className="contents" role="group" aria-label="Pattern motion">
      {motions.map((item, index) => (
        <MotionChip
          key={item.id}
          id={item.id}
          label={item.label}
          place={places[index] ?? "orbit-side"}
          delay={`${index * 80}ms`}
        />
      ))}
    </div>
  );
}
