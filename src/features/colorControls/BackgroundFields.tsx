import { Controller, useFormContext } from "react-hook-form";
import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { Window } from "../../components/Window/Window.tsx";
import type { DraftFields } from "../../types.ts";

export function BackgroundFields() {
  const { control } = useFormContext<DraftFields>();
  return (
    <Window title="Background" ornament="diamond">
      <div className="grid grid-cols-2 items-start gap-choice">
        <Controller
          name="backgroundTop"
          control={control}
          render={({ field }) => (
            <ColorField
              label="Top color"
              value={field.value}
              onChange={field.onChange}
              triggerRef={field.ref}
            />
          )}
        />
        <Controller
          name="backgroundBottom"
          control={control}
          render={({ field }) => (
            <ColorField
              label="Bottom color"
              value={field.value}
              onChange={field.onChange}
              triggerRef={field.ref}
            />
          )}
        />
      </div>
      <p className="text-tiny text-grape-700">The bar fades from the top color to the bottom color.</p>
    </Window>
  );
}
