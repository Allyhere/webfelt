import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";

export function BorderFields() {
  const { draft, update } = useUserbarDraft();
  return (
    <fieldset>
      <legend>Border</legend>
      <ColorField
        label="Border color"
        opacityLabel="Border opacity"
        color={draft.border}
        onChange={(border) => update({ border })}
      />
    </fieldset>
  );
}
