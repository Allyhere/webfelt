import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";

export function GlossFields() {
  const { draft, update } = useUserbarDraft();
  return (
    <fieldset>
      <legend>Gloss</legend>
      <ColorField
        label="Gloss color"
        opacityLabel="Gloss opacity"
        color={draft.gloss}
        onChange={(gloss) => update({ gloss })}
      />
    </fieldset>
  );
}
