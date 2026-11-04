import type { CSSProperties } from "react";
import { Button } from "../../components/Button/Button.tsx";
import { Dingbat } from "../../components/Dingbat/Dingbat.tsx";
import { Window } from "../../components/Window/Window.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";

export function ResultFields() {
  const { draft, previewSize, canvasRef, canSave, alertMessage } = useUserbarDraft();
  const previewStyle = {
    "--bar-width": previewSize.width,
    "--bar-height": previewSize.height,
  } as CSSProperties;
  const barLabel = draft.text.trim() ? `Userbar: ${draft.text}` : "Userbar";
  return (
    <Window title="Preview" ornament="heart">
      <figure className="grid justify-items-center gap-row">
        <div className="grid w-full place-items-center border border-grape-700 bg-lavender-100 p-window shadow-bevel-in">
          <canvas
            ref={canvasRef}
            className="pixelated preview"
            style={previewStyle}
            role="img"
            aria-label={barLabel}
          />
        </div>
        <figcaption className="text-center text-tiny text-grape-700">
          Shown at double size. The saved PNG is {previewSize.width} by {previewSize.height}{" "}
          pixels.
        </figcaption>
      </figure>
      {alertMessage ? (
        <p role="alert" className="border border-danger-700 bg-danger-100 px-choice py-tight text-tiny text-danger-700">
          {alertMessage}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-choice">
        <p className="text-tiny text-grape-700">
          {canSave ? "Ready to save." : "Fix the highlighted fields to save."}
        </p>
        <Button type="submit" variant="primary" isDisabled={!canSave}>
          <Dingbat name="arrow" />
          Save PNG
        </Button>
      </div>
    </Window>
  );
}
