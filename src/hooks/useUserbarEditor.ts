import { useCallback, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { initialDraft } from "../constants.ts";
import { readImageFile } from "../render/imageFile/imageFile.ts";
import type { Draft, DraftFields, UserbarEditor } from "../types.ts";
import { downloadCanvasPng } from "../utils/canvas.ts";
import { sizeError, spacingError, toggledIds } from "../utils/draft.ts";
import { imageFailure } from "../utils/image.ts";
import { useCanvasPaint } from "./useCanvasPaint.ts";
import { useImagePaste } from "./useImagePaste.ts";
import { useRenderedUserbar } from "./useRenderedUserbar.ts";

const { backgroundImage: initialImage, ...initialFields } = initialDraft;

export function useUserbarEditor(): UserbarEditor {
  const form = useForm<DraftFields>({ defaultValues: initialFields, mode: "onChange" });
  const fields = useWatch({ control: form.control }) as DraftFields;
  const [backgroundImage, setBackgroundImage] = useState(initialImage);
  const [actionError, setActionError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draft: Draft = useMemo(() => ({ ...fields, backgroundImage }), [fields, backgroundImage]);
  const canSave =
    sizeError(draft.width, draft.height) === null && spacingError(draft.scanlineSpacing) === null;
  const image = useRenderedUserbar(draft, canSave);
  useCanvasPaint(canvasRef, image);

  const update = useCallback(
    (partial: Partial<DraftFields>) => {
      for (const key of Object.keys(partial) as (keyof DraftFields)[]) {
        form.setValue(key, partial[key] as DraftFields[typeof key], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
      setActionError("");
    },
    [form],
  );

  const storeImage = useCallback((file: File, failureMessage: string) => {
    void readImageFile(file).then(
      (next) => {
        setBackgroundImage(next);
        setActionError("");
      },
      (error: unknown) => setActionError(imageFailure(error, failureMessage)),
    );
  }, []);

  const clearImage = useCallback(() => {
    setBackgroundImage(null);
    setActionError("");
  }, []);

  const onPasteImage = useCallback(
    (file: File) => storeImage(file, "Paste an image to use it as the background."),
    [storeImage],
  );
  const onPasteReject = useCallback(
    () => setActionError("Paste an image to use it as the background."),
    [],
  );
  useImagePaste(onPasteImage, onPasteReject);

  function save() {
    const canvas = canvasRef.current;
    if (!canvas || !canSave) return;
    downloadCanvasPng(canvas);
  }

  function toggleEffect(id: string) {
    update({ effectIds: toggledIds(form.getValues("effectIds"), id) });
  }

  return {
    draft,
    form,
    update,
    alertMessage: actionError,
    previewSize: image
      ? { width: image.width, height: image.height }
      : { width: initialDraft.width, height: initialDraft.height },
    canvasRef,
    save,
    canSave,
    storeImage,
    clearImage,
    toggleEffect,
  };
}
