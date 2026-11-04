import { useMemo, useRef } from "react";
import { useCanvasPaint } from "../../../hooks/useCanvasPaint.ts";
import { useUserbarDraft } from "../../../hooks/useUserbarDraft.ts";
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
} from "../patternCatalog/patternCatalog.constants.ts";
import { renderPatternSample } from "../svgPattern/svgPattern.ts";
import { SwatchButton } from "../../../components/SwatchButton/SwatchButton.tsx";
import { hexToRgb } from "../../../utils/color.ts";
import { sampleSpacing } from "../../../utils/draft.ts";

type PatternChoiceProps = {
  id: string;
  svg: string;
  children: string;
};

function PatternChoice({ id, svg, children }: PatternChoiceProps) {
  const { draft, update } = useUserbarDraft();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sample = useMemo(
    () =>
      renderPatternSample(
        svg,
        hexToRgb(draft.backgroundTop),
        hexToRgb(draft.backgroundBottom),
        { ...hexToRgb(draft.scanline.hex), a: 1 },
        sampleSpacing(draft.scanlineSpacing),
        draft.scanlineFlip,
      ),
    [
      svg,
      draft.backgroundTop,
      draft.backgroundBottom,
      draft.scanline,
      draft.scanlineSpacing,
      draft.scanlineFlip,
    ],
  );
  useCanvasPaint(canvasRef, sample);

  return (
    <SwatchButton
      pressed={draft.patternId === id}
      onPress={() => update({ patternId: id })}
      canvasRef={canvasRef}
    >
      {children}
    </SwatchButton>
  );
}

export function PatternList() {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-choice p-0">
      <PatternChoice id="diagonal" svg={diagonalPattern}>
        Diagonal
      </PatternChoice>
      <PatternChoice id="other-diagonal" svg={otherDiagonalPattern}>
        Other diagonal
      </PatternChoice>
      <PatternChoice id="horizontal" svg={horizontalPattern}>
        Horizontal
      </PatternChoice>
      <PatternChoice id="vertical" svg={verticalPattern}>
        Vertical
      </PatternChoice>
      <PatternChoice id="grid" svg={gridPattern}>
        Grid
      </PatternChoice>
      <PatternChoice id="checker" svg={checkerPattern}>
        Checker
      </PatternChoice>
      <PatternChoice id="dots" svg={dotsPattern}>
        Dots
      </PatternChoice>
      <PatternChoice id="brick" svg={brickPattern}>
        Brick
      </PatternChoice>
      <PatternChoice id="circles" svg={circlesPattern}>
        Circles
      </PatternChoice>
      <PatternChoice id="slash" svg={slashPattern}>
        Slash
      </PatternChoice>
    </ul>
  );
}
