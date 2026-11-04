import { FormProvider } from "react-hook-form";
import { useBlinkieEditor } from "../../hooks/useBlinkieEditor.ts";
import { BlinkieDraftContext } from "../BlinkieDraftContext.ts";
import type { BlinkieDraftProviderProps } from "./BlinkieDraftProvider.types.ts";

export function BlinkieDraftProvider({ children }: BlinkieDraftProviderProps) {
  const editor = useBlinkieEditor();
  return (
    <FormProvider {...editor.form}>
      <BlinkieDraftContext value={editor}>{children}</BlinkieDraftContext>
    </FormProvider>
  );
}
