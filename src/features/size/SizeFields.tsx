import { MAX_HEIGHT, MAX_WIDTH } from "../../constants.ts";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";
import { WholeNumberField } from "../../components/WholeNumberField/WholeNumberField.tsx";

export function SizeFields() {
  const { draft, update } = useUserbarDraft();
  return (
    <fieldset>
      <legend>Size</legend>
      <WholeNumberField
        label="Width"
        value={draft.width}
        min={1}
        max={MAX_WIDTH}
        onChange={(width) => update({ width })}
      />
      <WholeNumberField
        label="Height"
        value={draft.height}
        min={1}
        max={MAX_HEIGHT}
        onChange={(height) => update({ height })}
      />
    </fieldset>
  );
}
