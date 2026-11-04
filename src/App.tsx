import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { EffectList } from "./EffectList.tsx";
import { PatternList } from "./PatternList.tsx";
import { readImageFile } from "./render/imageFile.ts";
import { renderUserbar } from "./render/userbar.ts";
import type { Anchor, Placement, Rgb, Rgba, UserbarOptions } from "./render/types.ts";

const MAX_WIDTH = 2000;
const MAX_HEIGHT = 200;

type ColorDraft = {
  hex: string;
  opacity: number;
};

type Draft = {
  width: number;
  height: number;
  backgroundTop: string;
  backgroundBottom: string;
  text: string;
  textColor: ColorDraft;
  outlineColor: ColorDraft;
  textPlacement: Placement;
  gloss: ColorDraft;
  border: ColorDraft;
  patternId: string;
  effectId: string;
  scanline: ColorDraft;
  scanlineFlip: boolean;
  scanlineSpacing: number;
  backgroundImage: ImageData | null;
  imagePlacement: Placement;
};

const initialDraft: Draft = {
  width: 350,
  height: 19,
  backgroundTop: "#0000ff",
  backgroundBottom: "#80ffff",
  text: "hello world!",
  textColor: { hex: "#ffffff", opacity: 100 },
  outlineColor: { hex: "#000000", opacity: 100 },
  textPlacement: {
    horizontal: "end",
    horizontalDistance: 7,
    vertical: "center",
    verticalDistance: 0,
  },
  gloss: { hex: "#ffffff", opacity: 16 },
  border: { hex: "#000000", opacity: 100 },
  patternId: "diagonal",
  effectId: "none",
  scanline: { hex: "#000000", opacity: 71 },
  scanlineFlip: false,
  scanlineSpacing: 4,
  backgroundImage: null,
  imagePlacement: {
    horizontal: "start",
    horizontalDistance: 7,
    vertical: "center",
    verticalDistance: 0,
  },
};

function hexToRgb(hex: string): Rgb {
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

function colorToRgba(color: ColorDraft): Rgba {
  return { ...hexToRgb(color.hex), a: color.opacity / 100 };
}

function toOptions(draft: Draft): UserbarOptions {
  return {
    width: draft.width,
    height: draft.height,
    backgroundTop: hexToRgb(draft.backgroundTop),
    backgroundBottom: hexToRgb(draft.backgroundBottom),
    text: draft.text,
    textColor: colorToRgba(draft.textColor),
    outlineColor: colorToRgba(draft.outlineColor),
    textPlacement: draft.textPlacement,
    gloss: colorToRgba(draft.gloss),
    border: colorToRgba(draft.border),
    patternId: draft.patternId,
    effectId: draft.effectId,
    scanline: colorToRgba(draft.scanline),
    scanlineFlip: draft.scanlineFlip,
    scanlineSpacing: draft.scanlineSpacing,
    backgroundImage: draft.backgroundImage,
    imagePlacement: draft.imagePlacement,
  };
}

function sizeError(width: number, height: number): string | null {
  if (!Number.isInteger(width) || width < 1 || width > MAX_WIDTH) {
    return `Width must be a whole number from 1 to ${MAX_WIDTH}.`;
  }
  if (!Number.isInteger(height) || height < 1 || height > MAX_HEIGHT) {
    return `Height must be a whole number from 1 to ${MAX_HEIGHT}.`;
  }
  return null;
}

function spacingError(spacing: number): string | null {
  if (!Number.isInteger(spacing) || spacing < 1) {
    return "Pattern spacing must be a whole number of at least 1.";
  }
  return null;
}

function imageFailure(error: unknown, emptyTypeMessage: string): string {
  if (error instanceof Error && error.message === "not-image") return emptyTypeMessage;
  return "That image could not be read.";
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

function ColorField({
  label,
  opacityLabel,
  color,
  onChange,
}: {
  label: string;
  opacityLabel: string;
  color: ColorDraft;
  onChange: (color: ColorDraft) => void;
}) {
  const colorId = useId();
  const opacityId = useId();
  return (
    <>
      <label htmlFor={colorId}>
        {label}{" "}
        <input
          id={colorId}
          type="color"
          value={color.hex}
          onChange={(event) => onChange({ ...color, hex: event.target.value })}
        />
      </label>
      <label htmlFor={opacityId}>
        {opacityLabel}{" "}
        <input
          id={opacityId}
          type="range"
          min={0}
          max={100}
          value={color.opacity}
          onChange={(event) =>
            onChange({ ...color, opacity: Number(event.target.value) })
          }
        />{" "}
        <output htmlFor={opacityId}>{color.opacity}%</output>
      </label>
    </>
  );
}

function PlacementFields({
  legend,
  placement,
  onChange,
}: {
  legend: string;
  placement: Placement;
  onChange: (placement: Placement) => void;
}) {
  const horizontalId = useId();
  const verticalId = useId();
  const horizontalDistanceId = useId();
  const verticalDistanceId = useId();
  return (
    <fieldset>
      <legend>{legend}</legend>
      <label htmlFor={horizontalId}>
        Horizontal alignment{" "}
        <select
          id={horizontalId}
          value={placement.horizontal}
          onChange={(event) =>
            onChange({
              ...placement,
              horizontal: event.target.value as Anchor,
            })
          }
        >
          <option value="start">Left edge</option>
          <option value="center">Middle</option>
          <option value="end">Right edge</option>
        </select>
      </label>
      {placement.horizontal === "center" ? null : (
        <label htmlFor={horizontalDistanceId}>
          Horizontal distance{" "}
          <input
            id={horizontalDistanceId}
            type="number"
            value={placement.horizontalDistance}
            onChange={(event) =>
              onChange({
                ...placement,
                horizontalDistance: Number(event.target.value),
              })
            }
          />
        </label>
      )}
      <label htmlFor={verticalId}>
        Vertical alignment{" "}
        <select
          id={verticalId}
          value={placement.vertical}
          onChange={(event) =>
            onChange({
              ...placement,
              vertical: event.target.value as Anchor,
            })
          }
        >
          <option value="start">Top edge</option>
          <option value="center">Middle</option>
          <option value="end">Bottom edge</option>
        </select>
      </label>
      {placement.vertical === "center" ? null : (
        <label htmlFor={verticalDistanceId}>
          Vertical distance{" "}
          <input
            id={verticalDistanceId}
            type="number"
            value={placement.verticalDistance}
            onChange={(event) =>
              onChange({
                ...placement,
                verticalDistance: Number(event.target.value),
              })
            }
          />
        </label>
      )}
    </fieldset>
  );
}

function App() {
  const [draft, setDraft] = useState(initialDraft);
  const [actionError, setActionError] = useState("");
  const [previewSize, setPreviewSize] = useState({ width: 350, height: 19 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const widthId = useId();
  const heightId = useId();
  const textId = useId();
  const topId = useId();
  const bottomId = useId();
  const flipId = useId();
  const spacingId = useId();
  const fileId = useId();
  const limitError = sizeError(draft.width, draft.height);
  const lineError = spacingError(draft.scanlineSpacing);
  const alertMessage = limitError ?? lineError ?? actionError;
  const previewStyle = {
    "--bar-width": `${previewSize.width}px`,
    "--bar-height": `${previewSize.height}px`,
  } as CSSProperties;
  const barLabel = draft.text.trim() ? `Userbar: ${draft.text}` : "Userbar";

  function update(partial: Partial<Draft>) {
    setDraft((current) => ({ ...current, ...partial }));
    setActionError("");
  }

  function storeImage(file: File, failureMessage: string) {
    void readImageFile(file).then(
      (backgroundImage) => {
        setDraft((current) => ({ ...current, backgroundImage }));
        setActionError("");
      },
      (error: unknown) => setActionError(imageFailure(error, failureMessage)),
    );
  }

  useEffect(() => {
    if (limitError || lineError) return;
    const render = { cancelled: false };
    void renderUserbar(toOptions(draft)).then((image) => {
      if (render.cancelled) return;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;
      canvas.width = image.width;
      canvas.height = image.height;
      context.putImageData(image, 0, 0);
      setPreviewSize({ width: image.width, height: image.height });
    });
    return () => {
      render.cancelled = true;
    };
  }, [draft, limitError, lineError]);

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      if (isTypingTarget(event.target)) return;
      const files = event.clipboardData?.files;
      if (!files || files.length === 0) return;
      const file = [...files].find(
        (item) => item.type.startsWith("image/") || item.type === "",
      );
      if (!file) {
        setActionError("Paste an image to use it as the background.");
        return;
      }
      event.preventDefault();
      void readImageFile(file).then(
        (backgroundImage) => {
          setDraft((current) => ({ ...current, backgroundImage }));
          setActionError("");
        },
        (error: unknown) =>
          setActionError(
            imageFailure(error, "Paste an image to use it as the background."),
          ),
      );
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  function save() {
    const canvas = canvasRef.current;
    if (!canvas || limitError || lineError) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "userbar.png";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  return (
    <main>
      <h1>Userbar generator</h1>
      <p>
        You can turn off gloss, the border, and the pattern by setting their
        opacity to zero.
      </p>
      {alertMessage ? <p role="alert">{alertMessage}</p> : null}
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <fieldset>
          <legend>Size</legend>
          <label htmlFor={widthId}>
            Width{" "}
            <input
              id={widthId}
              type="number"
              min={1}
              max={MAX_WIDTH}
              step={1}
              value={Number.isNaN(draft.width) ? "" : draft.width}
              onChange={(event) =>
                update({
                  width:
                    event.target.value === ""
                      ? Number.NaN
                      : Number(event.target.value),
                })
              }
            />
          </label>
          <label htmlFor={heightId}>
            Height{" "}
            <input
              id={heightId}
              type="number"
              min={1}
              max={MAX_HEIGHT}
              step={1}
              value={Number.isNaN(draft.height) ? "" : draft.height}
              onChange={(event) =>
                update({
                  height:
                    event.target.value === ""
                      ? Number.NaN
                      : Number(event.target.value),
                })
              }
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Background</legend>
          <label htmlFor={topId}>
            Top color{" "}
            <input
              id={topId}
              type="color"
              value={draft.backgroundTop}
              onChange={(event) => update({ backgroundTop: event.target.value })}
            />
          </label>
          <label htmlFor={bottomId}>
            Bottom color{" "}
            <input
              id={bottomId}
              type="color"
              value={draft.backgroundBottom}
              onChange={(event) =>
                update({ backgroundBottom: event.target.value })
              }
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Text</legend>
          <label htmlFor={textId}>
            Text{" "}
            <input
              id={textId}
              type="text"
              size={40}
              value={draft.text}
              onChange={(event) => update({ text: event.target.value })}
            />
          </label>
          <ColorField
            label="Color"
            opacityLabel="Color opacity"
            color={draft.textColor}
            onChange={(textColor) => update({ textColor })}
          />
          <ColorField
            label="Outline"
            opacityLabel="Outline opacity"
            color={draft.outlineColor}
            onChange={(outlineColor) => update({ outlineColor })}
          />
          <PlacementFields
            legend="Text placement"
            placement={draft.textPlacement}
            onChange={(textPlacement) => update({ textPlacement })}
          />
        </fieldset>
        <fieldset>
          <legend>Gloss</legend>
          <ColorField
            label="Gloss color"
            opacityLabel="Gloss opacity"
            color={draft.gloss}
            onChange={(gloss) => update({ gloss })}
          />
        </fieldset>
        <fieldset>
          <legend>Border</legend>
          <ColorField
            label="Border color"
            opacityLabel="Border opacity"
            color={draft.border}
            onChange={(border) => update({ border })}
          />
        </fieldset>
        <fieldset>
          <legend>Pattern</legend>
          <PatternList
            selectedId={draft.patternId}
            top={draft.backgroundTop}
            bottom={draft.backgroundBottom}
            color={colorToRgba(draft.scanline)}
            spacing={draft.scanlineSpacing}
            flip={draft.scanlineFlip}
            onSelect={(patternId) => update({ patternId })}
          />
          <ColorField
            label="Pattern color"
            opacityLabel="Pattern opacity"
            color={draft.scanline}
            onChange={(scanline) => update({ scanline })}
          />
          <label htmlFor={flipId}>
            <input
              id={flipId}
              type="checkbox"
              checked={draft.scanlineFlip}
              onChange={(event) => update({ scanlineFlip: event.target.checked })}
            />{" "}
            Flip direction
          </label>
          <label htmlFor={spacingId}>
            Spacing{" "}
            <input
              id={spacingId}
              type="number"
              min={1}
              step={1}
              value={Number.isNaN(draft.scanlineSpacing) ? "" : draft.scanlineSpacing}
              onChange={(event) =>
                update({
                  scanlineSpacing:
                    event.target.value === ""
                      ? Number.NaN
                      : Number(event.target.value),
                })
              }
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Effect</legend>
          <EffectList
            selectedId={draft.effectId}
            patternId={draft.patternId}
            top={draft.backgroundTop}
            bottom={draft.backgroundBottom}
            color={colorToRgba(draft.scanline)}
            spacing={draft.scanlineSpacing}
            flip={draft.scanlineFlip}
            onSelect={(effectId) => update({ effectId })}
          />
        </fieldset>
        <fieldset>
          <legend>Background image</legend>
          <label htmlFor={fileId}>
            Image file{" "}
            <input
              id={fileId}
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) storeImage(file, "Choose an image file.");
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              update({ backgroundImage: null });
              if (fileRef.current) fileRef.current.value = "";
            }}
          >
            Clear
          </button>
          <p>You can also paste an image while this text field is not focused.</p>
          <PlacementFields
            legend="Image placement"
            placement={draft.imagePlacement}
            onChange={(imagePlacement) => update({ imagePlacement })}
          />
        </fieldset>
        <fieldset>
          <legend>Result</legend>
          <figure>
            <canvas
              ref={canvasRef}
              className="userbar-preview"
              style={previewStyle}
              role="img"
              aria-label={barLabel}
            />
            <figcaption>
              Shown at double size. The saved PNG is {previewSize.width} by{" "}
              {previewSize.height} pixels.
            </figcaption>
          </figure>
          <button type="button" onClick={save} disabled={Boolean(limitError || lineError)}>
            Save
          </button>
        </fieldset>
      </form>
    </main>
  );
}

export default App;
