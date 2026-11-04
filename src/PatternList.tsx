import { useEffect, useRef } from "react";
import {
  brickPattern,
  checkerPattern,
  circlesPattern,
  diagonalPattern,
  dotsPattern,
  gridPattern,
  horizontalPattern,
  otherDiagonalPattern,
  slashPattern,
  verticalPattern,
} from "./render/patternCatalog.ts";
import { renderPatternSample } from "./render/svgPattern.ts";
import type { Rgb, Rgba } from "./render/types.ts";

const SAMPLE_SPACING = 4;

function hexToRgb(hex: string): Rgb {
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

function PatternChoice({
  id,
  svg,
  selected,
  top,
  bottom,
  color,
  spacing,
  flip,
  onSelect,
  children,
}: {
  id: string;
  svg: string;
  selected: boolean;
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
    const sample = renderPatternSample(
      svg,
      hexToRgb(top),
      hexToRgb(bottom),
      { ...color, a: 1 },
      Number.isInteger(spacing) && spacing >= 1 ? spacing : SAMPLE_SPACING,
      flip,
    );
    canvas.width = sample.width;
    canvas.height = sample.height;
    context.putImageData(sample, 0, 0);
  }, [svg, top, bottom, color, spacing, flip]);

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

export function PatternList({
  selectedId,
  top,
  bottom,
  color,
  spacing,
  flip,
  onSelect,
}: {
  selectedId: string;
  top: string;
  bottom: string;
  color: Rgba;
  spacing: number;
  flip: boolean;
  onSelect: (id: string) => void;
}) {
  const shared = { top, bottom, color, spacing, flip, onSelect };
  return (
    <ul className="pattern-list">
      <PatternChoice {...shared} id="diagonal" svg={diagonalPattern} selected={selectedId === "diagonal"}>
        Diagonal
      </PatternChoice>
      <PatternChoice {...shared} id="other-diagonal" svg={otherDiagonalPattern} selected={selectedId === "other-diagonal"}>
        Other diagonal
      </PatternChoice>
      <PatternChoice {...shared} id="horizontal" svg={horizontalPattern} selected={selectedId === "horizontal"}>
        Horizontal
      </PatternChoice>
      <PatternChoice {...shared} id="vertical" svg={verticalPattern} selected={selectedId === "vertical"}>
        Vertical
      </PatternChoice>
      <PatternChoice {...shared} id="grid" svg={gridPattern} selected={selectedId === "grid"}>
        Grid
      </PatternChoice>
      <PatternChoice {...shared} id="checker" svg={checkerPattern} selected={selectedId === "checker"}>
        Checker
      </PatternChoice>
      <PatternChoice {...shared} id="dots" svg={dotsPattern} selected={selectedId === "dots"}>
        Dots
      </PatternChoice>
      <PatternChoice {...shared} id="brick" svg={brickPattern} selected={selectedId === "brick"}>
        Brick
      </PatternChoice>
      <PatternChoice {...shared} id="circles" svg={circlesPattern} selected={selectedId === "circles"}>
        Circles
      </PatternChoice>
      <PatternChoice {...shared} id="slash" svg={slashPattern} selected={selectedId === "slash"}>
        Slash
      </PatternChoice>
    </ul>
  );
}
