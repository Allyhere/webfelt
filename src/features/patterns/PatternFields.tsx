import { useId } from "react";
import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";
import { PatternList } from "./PatternList/PatternList.tsx";
import { WholeNumberField } from "../../components/WholeNumberField/WholeNumberField.tsx";

export function PatternFields() {
  const { draft, update } = useUserbarDraft();
  const flipId = useId();
  return (
    <fieldset>
      <legend>Pattern</legend>
      <PatternList />
      <ColorField
        label="Pattern color"
        opacityLabel="Pattern opacity"
        color={draft.scanline}
        onChange={(scanline) => update({ scanline })}
      />
      <label htmlFor={flipId}>
        <input
          id={flipId}
          type="checkbox"
          checked={draft.scanlineFlip}
          onChange={(event) => update({ scanlineFlip: event.target.checked })}
        />{" "}
        Flip direction
      </label>
      <WholeNumberField
        label="Spacing"
        value={draft.scanlineSpacing}
        min={1}
        onChange={(scanlineSpacing) => update({ scanlineSpacing })}
      />
    </fieldset>
  );
}
