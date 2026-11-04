import { Controller, useFormContext } from "react-hook-form";
import { MAX_HEIGHT, MAX_WIDTH } from "../../constants.ts";
import { NumberField } from "../../components/NumberField/NumberField.tsx";
import { Card } from "../../components/Card/Card.tsx";
import type { DraftFields } from "../../types.ts";
import { asRule, heightError, widthError } from "../../utils/draft.ts";

export function SizeFields() {
  const { control } = useFormContext<DraftFields>();
  return (
    <Card title="Size" bullet="diamond">
      <div className="grid grid-cols-2 items-start gap-choice">
        <Controller
          name="width"
          control={control}
          rules={{ validate: asRule(widthError) }}
          render={({ field, fieldState }) => (
            <NumberField
              label="Width"
              value={field.value}
              onChange={field.onChange}
              minValue={1}
              maxValue={MAX_WIDTH}
              inputRef={field.ref}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="height"
          control={control}
          rules={{ validate: asRule(heightError) }}
          render={({ field, fieldState }) => (
            <NumberField
              label="Height"
              value={field.value}
              onChange={field.onChange}
              minValue={1}
              maxValue={MAX_HEIGHT}
              inputRef={field.ref}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </div>
      <p className="text-tiny text-grape-700">
        Classic forum bars are 350 by 19 pixels. The limit is {MAX_WIDTH} by {MAX_HEIGHT}.
      </p>
    </Card>
  );
}
