import { FormProvider } from "react-hook-form";
import { useUserbarEditor } from "../../hooks/useUserbarEditor.ts";
import { UserbarDraftContext } from "../UserbarDraftContext.ts";
import type { UserbarDraftProviderProps } from "./UserbarDraftProvider.types.ts";

export function UserbarDraftProvider({ children }: UserbarDraftProviderProps) {
  const editor = useUserbarEditor();
  return (
    <FormProvider {...editor.form}>
      <UserbarDraftContext value={editor}>{children}</UserbarDraftContext>
    </FormProvider>
  );
}
