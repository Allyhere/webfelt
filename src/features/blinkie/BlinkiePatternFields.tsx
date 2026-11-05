import { Controller, useFormContext } from "react-hook-form";
import { Card } from "../../components/Card/Card.tsx";
import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { useBlinkieDraft } from "../../hooks/useBlinkieDraft.ts";
import type { BlinkieDraft } from "../../render/blinkie/blinkie.types.ts";
import { BlinkiePatternList } from "./BlinkiePatternList/BlinkiePatternList.tsx";

export function BlinkiePatternFields() {
  const { control } = useFormContext<BlinkieDraft>();
  const { draft } = useBlinkieDraft();
  const showColor = draft.patternId !== "none";
  return (
    <Card title="Pattern" bullet="scissors">
      <BlinkiePatternList />
      {showColor ? (
        <Controller
          name="patternColor"
          control={control}
          render={({ field }) => (
            <ColorField label="Pattern color" value={field.value} onChange={field.onChange} />
          )}
        />
      ) : null}
    </Card>
  );
}
