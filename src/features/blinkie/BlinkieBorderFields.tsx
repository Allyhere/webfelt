import { Controller, useFormContext } from "react-hook-form";
import { Card } from "../../components/Card/Card.tsx";
import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { Slider } from "../../components/Slider/Slider.tsx";
import { useBlinkieDraft } from "../../hooks/useBlinkieDraft.ts";
import { BLINKIE_DELAY_MAX, BLINKIE_DELAY_MIN } from "../../render/blinkie/blinkie.constants.ts";
import type { BlinkieDraft } from "../../render/blinkie/blinkie.types.ts";
import { BorderList } from "./BorderList/BorderList.tsx";

export function BlinkieBorderFields() {
  const { control } = useFormContext<BlinkieDraft>();
  const { draft } = useBlinkieDraft();
  const showAccent = draft.borderMotion !== "still";
  return (
    <Card title="Border" bullet="star">
      <BorderList />
      <Controller
        name="borderColor"
        control={control}
        render={({ field }) => (
          <ColorField label="Border color" value={field.value} onChange={field.onChange} />
        )}
      />
      {showAccent ? (
        <Controller
          name="accentColor"
          control={control}
          render={({ field }) => (
            <ColorField label="Accent" value={field.value} onChange={field.onChange} />
          )}
        />
      ) : null}
      <Controller
        name="delay"
        control={control}
        render={({ field }) => (
          <Slider
            label="Delay"
            value={field.value}
            onChange={field.onChange}
            minValue={BLINKIE_DELAY_MIN}
            maxValue={BLINKIE_DELAY_MAX}
          />
        )}
      />
      <p className="text-tiny text-grape-700">Hundredths of a second each frame holds.</p>
    </Card>
  );
}
