import { useCallback, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { initialBlinkie } from "../render/blinkie/blinkie.constants.ts";
import type { BlinkieDraft, BlinkieEditor } from "../render/blinkie/blinkie.types.ts";
import { downloadGif } from "../render/gif/gif.ts";
import { useRenderedBlinkie } from "./useRenderedBlinkie.ts";

export function useBlinkieEditor(): BlinkieEditor {
  const form = useForm<BlinkieDraft>({ defaultValues: initialBlinkie, mode: "onChange" });
  const fields = useWatch({ control: form.control }) as Partial<BlinkieDraft>;
  const draft = useMemo(() => {
    const next = { ...initialBlinkie };
    for (const key of Object.keys(initialBlinkie) as (keyof BlinkieDraft)[]) {
      const value = fields[key];
      if (value !== undefined) next[key] = value as never;
    }
    return next;
  }, [fields]);
  const result = useRenderedBlinkie(draft);
  const frames = result?.frames ?? [];
  const textFits = result?.textFits ?? true;

  const update = useCallback(
    (partial: Partial<BlinkieDraft>) => {
      for (const key of Object.keys(partial) as (keyof BlinkieDraft)[]) {
        form.setValue(key, partial[key] as BlinkieDraft[typeof key], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [form],
  );

  function save() {
    if (!result?.textFits || frames.length === 0) return;
    downloadGif(frames, draft.delay, "blinkie.gif");
  }

  return {
    draft,
    form,
    update,
    frames,
    textFits,
    canSave: result !== null && textFits && frames.length > 0,
    save,
  };
}
