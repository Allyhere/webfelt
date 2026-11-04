import { Controller, useFormContext } from "react-hook-form";
import { Card } from "../../components/Card/Card.tsx";
import { ColorField } from "../../components/ColorField/ColorField.tsx";
import type { BlinkieDraft } from "../../render/blinkie/blinkie.types.ts";

export function BlinkieBackgroundFields() {
  const { control } = useFormContext<BlinkieDraft>();
  return (
    <Card title="Background" bullet="diamond">
      <Controller
        name="fill"
        control={control}
        render={({ field }) => (
          <ColorField label="Fill" value={field.value} onChange={field.onChange} />
        )}
      />
    </Card>
  );
}
