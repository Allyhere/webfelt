import { Controller, useFormContext } from "react-hook-form";
import { PlacementFields } from "../../components/PlacementFields/PlacementFields.tsx";
import { TextField } from "../../components/TextField/TextField.tsx";
import { TintField } from "../../components/TintField/TintField.tsx";
import { Window } from "../../components/Window/Window.tsx";
import type { DraftFields } from "../../types.ts";

export function TextFields() {
  const { control } = useFormContext<DraftFields>();
  return (
    <Window title="Text" ornament="arrow">
      <Controller
        name="text"
        control={control}
        render={({ field }) => (
          <TextField
            label="Text"
            value={field.value}
            onChange={field.onChange}
            inputRef={field.ref}
            description="Leave it empty for a bar with no text."
          />
        )}
      />
      <div className="grid gap-row md:grid-cols-2 md:gap-choice">
        <Controller
          name="textColor"
          control={control}
          render={({ field }) => (
            <TintField
              label="Text color"
              opacityLabel="Text opacity"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="outlineColor"
          control={control}
          render={({ field }) => (
            <TintField
              label="Outline color"
              opacityLabel="Outline opacity"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Controller
        name="textPlacement"
        control={control}
        render={({ field }) => (
          <PlacementFields
            legend="Text placement"
            placement={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </Window>
  );
}
