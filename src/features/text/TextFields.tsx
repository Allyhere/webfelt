import { useId } from "react";
import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";
import { PlacementFields } from "../../components/PlacementFields/PlacementFields.tsx";

export function TextFields() {
  const { draft, update } = useUserbarDraft();
  const textId = useId();
  return (
    <fieldset>
      <legend>Text</legend>
      <label htmlFor={textId}>
        Text{" "}
        <input
          id={textId}
          type="text"
          size={40}
          value={draft.text}
          onChange={(event) => update({ text: event.target.value })}
        />
      </label>
      <ColorField
        label="Color"
        opacityLabel="Color opacity"
        color={draft.textColor}
        onChange={(textColor) => update({ textColor })}
      />
      <ColorField
        label="Outline"
        opacityLabel="Outline opacity"
        color={draft.outlineColor}
        onChange={(outlineColor) => update({ outlineColor })}
      />
      <PlacementFields
        legend="Text placement"
        placement={draft.textPlacement}
        onChange={(textPlacement) => update({ textPlacement })}
      />
    </fieldset>
  );
}
