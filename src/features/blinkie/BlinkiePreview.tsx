import { useRef, useState, type CSSProperties } from "react";
import { Button } from "../../components/Button/Button.tsx";
import { Card } from "../../components/Card/Card.tsx";
import { Dingbat } from "../../components/Dingbat/Dingbat.tsx";
import { useBlinkieDraft } from "../../hooks/useBlinkieDraft.ts";
import { useBlinkiePlayback } from "../../hooks/useBlinkiePlayback.ts";
import { useCanvasPaint } from "../../hooks/useCanvasPaint.ts";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.ts";
import { BLINKIE_HEIGHT, BLINKIE_WIDTH } from "../../render/blinkie/blinkie.constants.ts";

export function BlinkiePreview() {
  const { draft, frames, canSave, textFits } = useBlinkieDraft();
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const hold = paused || reduced;
  const frame = useBlinkiePlayback(frames.length, draft.delay, hold);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = frames[hold ? 0 : frame] ?? null;
  useCanvasPaint(canvasRef, image);
  const previewStyle = {
    "--bar-width": BLINKIE_WIDTH,
    "--bar-height": BLINKIE_HEIGHT,
  } as CSSProperties;
  const label = draft.text.trim() ? `Blinkie: ${draft.text}` : "Blinkie";
  const frameCount = frames.length === 1 ? "1 frame" : `${frames.length} frames`;
  const status = !textFits
    ? "Fix the highlighted fields to save."
    : canSave
      ? "Ready to save."
      : "Painting the blinkie.";

  return (
    <Card title="Preview" bullet="heart">
      <figure className="grid justify-items-center gap-row">
        <div className="grid w-full place-items-center rounded-control border border-dotted border-lavender-400 bg-lavender-100 p-window">
          <canvas
            ref={canvasRef}
            className="pixelated preview"
            style={previewStyle}
            role="img"
            aria-label={label}
          />
        </div>
        <figcaption className="text-center text-tiny text-grape-700">
          Shown at double size. 150 by 20 pixels
          {frames.length > 0 ? `, ${frameCount}` : ""}. The saved file is a GIF.
        </figcaption>
      </figure>
      <div className="flex flex-wrap items-center justify-between gap-choice">
        <p className="text-tiny text-grape-700">{status}</p>
        <div className="flex flex-wrap items-center gap-choice">
          <Button type="button" onPress={() => setPaused(hold ? false : true)}>
            <Dingbat name={hold ? "arrow" : "note"} />
            {hold ? "Play" : "Pause"}
          </Button>
          <Button type="submit" variant="primary" isDisabled={!canSave}>
            <Dingbat name="arrow" />
            Save GIF
          </Button>
        </div>
      </div>
    </Card>
  );
}
