import { Controller, useFormContext } from "react-hook-form";
import { TintField } from "../../components/TintField/TintField.tsx";
import { Card } from "../../components/Card/Card.tsx";
import type { DraftFields } from "../../types.ts";

export function GlossFields() {
  const { control } = useFormContext<DraftFields>();
  return (
    <Card title="Gloss" bullet="star">
      <Controller
        name="gloss"
        control={control}
        render={({ field }) => (
          <TintField
            label="Gloss color"
            opacityLabel="Gloss opacity"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <p className="text-tiny text-grape-700">Set the opacity to zero to turn the gloss off.</p>
    </Card>
  );
}
