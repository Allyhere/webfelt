import { useEffect, useRef } from "react";
import { patternSource } from "./render/patternCatalog.ts";
import { renderEffectSample } from "./render/effects/preview.ts";
import type { Rgb, Rgba } from "./render/types.ts";

const SAMPLE_SPACING = 4;

function hexToRgb(hex: string): Rgb {
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

function EffectChoice({
  id,
  selected,
  patternId,
  top,
  bottom,
  color,
  spacing,
  flip,
  onSelect,
  children,
}: {
  id: string;
  selected: boolean;
  patternId: string;
  top: string;
  bottom: string;
  color: Rgba;
  spacing: number;
  flip: boolean;
  onSelect: (id: string) => void;
  children: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const sample = renderEffectSample(
      patternSource(patternId),
      hexToRgb(top),
      hexToRgb(bottom),
      color,
      Number.isInteger(spacing) && spacing >= 1 ? spacing : SAMPLE_SPACING,
      flip,
      id,
    );
    canvas.width = sample.width;
    canvas.height = sample.height;
    context.putImageData(sample, 0, 0);
  }, [id, patternId, top, bottom, color, spacing, flip]);

  return (
    <li>
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => onSelect(id)}
      >
        <canvas ref={canvasRef} className="pattern-swatch" aria-hidden="true" />
        {children}
      </button>
    </li>
  );
}

export function EffectList({
  selectedId,
  patternId,
  top,
  bottom,
  color,
  spacing,
  flip,
  onSelect,
}: {
  selectedId: string;
  patternId: string;
  top: string;
  bottom: string;
  color: Rgba;
  spacing: number;
  flip: boolean;
  onSelect: (id: string) => void;
}) {
  const shared = { patternId, top, bottom, color, spacing, flip, onSelect };
  return (
    <ul className="pattern-list">
      <EffectChoice {...shared} id="none" selected={selectedId === "none"}>
        None
      </EffectChoice>
      <EffectChoice {...shared} id="wave" selected={selectedId === "wave"}>
        Wave
      </EffectChoice>
      <EffectChoice {...shared} id="glitch" selected={selectedId === "glitch"}>
        Glitch
      </EffectChoice>
      <EffectChoice {...shared} id="split" selected={selectedId === "split"}>
        Split
      </EffectChoice>
      <EffectChoice {...shared} id="pixelate" selected={selectedId === "pixelate"}>
        Pixelate
      </EffectChoice>
      <EffectChoice {...shared} id="grain" selected={selectedId === "grain"}>
        Grain
      </EffectChoice>
      <EffectChoice {...shared} id="posterize" selected={selectedId === "posterize"}>
        Posterize
      </EffectChoice>
      <EffectChoice {...shared} id="blur" selected={selectedId === "blur"}>
        Blur
      </EffectChoice>
      <EffectChoice {...shared} id="motion" selected={selectedId === "motion"}>
        Motion blur
      </EffectChoice>
      <EffectChoice {...shared} id="emboss" selected={selectedId === "emboss"}>
        Emboss
      </EffectChoice>
      <EffectChoice {...shared} id="warp" selected={selectedId === "warp"}>
        Warp
      </EffectChoice>
      <EffectChoice {...shared} id="bulge" selected={selectedId === "bulge"}>
        Bulge
      </EffectChoice>
    </ul>
  );
}
