import { Controller, useFormContext } from "react-hook-form";
import { TintField } from "../../components/TintField/TintField.tsx";
import { Card } from "../../components/Card/Card.tsx";
import type { DraftFields } from "../../types.ts";

export function BorderFields() {
  const { control } = useFormContext<DraftFields>();
  return (
    <Card title="Border" bullet="star">
      <Controller
        name="border"
        control={control}
        render={({ field }) => (
          <TintField
            label="Border color"
            opacityLabel="Border opacity"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <p className="text-tiny text-grape-700">Set the opacity to zero to turn the border off.</p>
    </Card>
  );
}
