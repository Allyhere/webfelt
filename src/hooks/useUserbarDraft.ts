import { useContext } from "react";
import { UserbarDraftContext } from "../context/UserbarDraftContext.ts";
import type { UserbarEditor } from "../types.ts";

export function useUserbarDraft(): UserbarEditor {
  const editor = useContext(UserbarDraftContext);
  if (!editor) throw new Error("Userbar fields require a userbar editor");
  return editor;
}
