import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../../components/Checkbox/Checkbox.tsx";
import { NumberField } from "../../components/NumberField/NumberField.tsx";
import { TintField } from "../../components/TintField/TintField.tsx";
import { Window } from "../../components/Window/Window.tsx";
import type { DraftFields } from "../../types.ts";
import { asRule, spacingError } from "../../utils/draft.ts";
import { PatternList } from "./PatternList/PatternList.tsx";

export function PatternFields() {
  const { control } = useFormContext<DraftFields>();
  return (
    <Window title="Pattern" ornament="scissors">
      <PatternList />
      <Controller
        name="scanline"
        control={control}
        render={({ field }) => (
          <TintField
            label="Pattern color"
            opacityLabel="Pattern opacity"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <div className="grid gap-row">
        <Controller
          name="scanlineSpacing"
          control={control}
          rules={{ validate: asRule(spacingError) }}
          render={({ field, fieldState }) => (
            <NumberField
              label="Spacing"
              value={field.value}
              onChange={field.onChange}
              minValue={1}
              inputRef={field.ref}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="scanlineFlip"
          control={control}
          render={({ field }) => (
            <Checkbox isSelected={field.value} onChange={field.onChange}>
              Flip direction
            </Checkbox>
          )}
        />
      </div>
    </Window>
  );
}
