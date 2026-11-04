import type { CSSProperties } from "react";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";

export function ResultFields() {
  const { draft, previewSize, canvasRef, save, canSave } = useUserbarDraft();
  const previewStyle = {
    "--bar-width": `${previewSize.width}px`,
    "--bar-height": `${previewSize.height}px`,
  } as CSSProperties;
  const barLabel = draft.text.trim() ? `Userbar: ${draft.text}` : "Userbar";
  return (
    <fieldset>
      <legend>Result</legend>
      <figure>
        <canvas
          ref={canvasRef}
          className="pixelated preview"
          style={previewStyle}
          role="img"
          aria-label={barLabel}
        />
        <figcaption>
          Shown at double size. The saved PNG is {previewSize.width} by{" "}
          {previewSize.height} pixels.
        </figcaption>
      </figure>
      <button type="button" onClick={save} disabled={!canSave}>
        Save
      </button>
    </fieldset>
  );
}
