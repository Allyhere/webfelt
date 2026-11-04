import { useRef, useState } from "react";
import { initialDraft } from "../constants.ts";
import { readImageFile } from "../render/imageFile/imageFile.ts";
import type { Draft, UserbarEditor } from "../types.ts";
import { downloadCanvasPng } from "../utils/canvas.ts";
import { sizeError, spacingError, toggledIds } from "../utils/draft.ts";
import { imageFailure } from "../utils/image.ts";
import { useCanvasPaint } from "./useCanvasPaint.ts";
import { useImagePaste } from "./useImagePaste.ts";
import { useRenderedUserbar } from "./useRenderedUserbar.ts";

export function useUserbarEditor(): UserbarEditor {
  const [draft, setDraft] = useState(initialDraft);
  const [actionError, setActionError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const limitError = sizeError(draft.width, draft.height);
  const lineError = spacingError(draft.scanlineSpacing);
  const canSave = limitError === null && lineError === null;
  const image = useRenderedUserbar(draft, canSave);
  useCanvasPaint(canvasRef, image);

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

  useImagePaste(
    (file) => storeImage(file, "Paste an image to use it as the background."),
    () => setActionError("Paste an image to use it as the background."),
  );

  function save() {
    const canvas = canvasRef.current;
    if (!canvas || !canSave) return;
    downloadCanvasPng(canvas);
  }

  function toggleEffect(id: string) {
    update({ effectIds: toggledIds(draft.effectIds, id) });
  }

  return {
    draft,
    update,
    alertMessage: limitError ?? lineError ?? actionError,
    previewSize: image
      ? { width: image.width, height: image.height }
      : { width: initialDraft.width, height: initialDraft.height },
    canvasRef,
    fileRef,
    save,
    canSave,
    storeImage,
    toggleEffect,
  };
}
