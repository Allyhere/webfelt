import type { ReactNode } from "react";
import { useUserbarEditor } from "../../hooks/useUserbarEditor.ts";
import { UserbarDraftContext } from "../UserbarDraftContext.ts";

type UserbarDraftProviderProps = {
  children: ReactNode;
};

export function UserbarDraftProvider({ children }: UserbarDraftProviderProps) {
  const editor = useUserbarEditor();
  return <UserbarDraftContext value={editor}>{children}</UserbarDraftContext>;
}
