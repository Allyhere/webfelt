import { useContext } from "react";
import { BlinkieDraftContext } from "../context/BlinkieDraftContext.ts";
import type { BlinkieEditor } from "../render/blinkie/blinkie.types.ts";

export function useBlinkieDraft(): BlinkieEditor {
  const editor = useContext(BlinkieDraftContext);
  if (!editor) throw new Error("Blinkie fields require a blinkie editor");
  return editor;
}
