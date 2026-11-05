import { Controller, useFormContext } from "react-hook-form";
import { Card } from "../../components/Card/Card.tsx";
import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { TextField } from "../../components/TextField/TextField.tsx";
import { useBlinkieDraft } from "../../hooks/useBlinkieDraft.ts";
import type { BlinkieDraft } from "../../render/blinkie/blinkie.types.ts";
import { FontList } from "./FontList/FontList.tsx";

export function BlinkieTextFields() {
  const { control } = useFormContext<BlinkieDraft>();
  const { draft, textFits } = useBlinkieDraft();
  const showFlash =
    draft.fontMotion === "flash" || draft.fontMotion === "pulse" || draft.fontMotion === "chase";
  return (
    <Card title="Text" bullet="arrow">
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <TextField
            label="Text"
            value={field.value}
            onChange={field.onChange}
            inputRef={field.ref}
            description="One line, centered."
            errorMessage={textFits ? undefined : "This line is wider than the frame."}
          />
        )}
      />
      <div className="grid gap-row md:grid-cols-2 md:gap-choice">
        <Controller
          name="textColor"
          control={control}
          render={({ field }) => (
            <ColorField label="Text color" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name="outlineColor"
          control={control}
          render={({ field }) => (
            <ColorField label="Outline" value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      {showFlash ? (
        <Controller
          name="flashColor"
          control={control}
          render={({ field }) => (
            <ColorField label="Flash color" value={field.value} onChange={field.onChange} />
          )}
        />
      ) : null}
      <FontList />
    </Card>
  );
}
