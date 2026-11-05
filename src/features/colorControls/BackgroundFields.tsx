import { useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ChoiceList } from "../../components/ChoiceList/ChoiceList.tsx";
import { ColorField } from "../../components/ColorField/ColorField.tsx";
import { Card } from "../../components/Card/Card.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";
import type { GradientAxis } from "../../render/badge/badgeShape.types.ts";
import { toImageData } from "../../render/color/color.ts";
import { createGradientSurface } from "../../render/gradient.ts";
import type { DraftFields } from "../../types.ts";
import { hexToRgb } from "../../utils/color.ts";

const axes = [
  { id: "vertical", label: "Vertical" },
  { id: "horizontal", label: "Horizontal" },
] as const satisfies readonly { id: GradientAxis; label: string }[];

function useGradientSample(id: GradientAxis): ImageData {
  const { draft } = useUserbarDraft();
  return useMemo(
    () =>
      toImageData(
        createGradientSurface(
          48,
          48,
          hexToRgb(draft.backgroundTop),
          hexToRgb(draft.backgroundBottom),
          id,
        ),
      ),
    [id, draft.backgroundTop, draft.backgroundBottom],
  );
}

export function BackgroundFields() {
  const { control, setValue } = useFormContext<DraftFields>();
  const { draft } = useUserbarDraft();
  const axis = useWatch({ control, name: "gradientAxis" });
  const horizontal = axis === "horizontal";
  return (
    <Card title="Background" bullet="diamond">
      <ChoiceList
        label="Gradient"
        items={axes}
        isSelected={(id) => draft.gradientAxis === id}
        onSelect={(id) =>
          setValue("gradientAxis", id, { shouldDirty: true, shouldValidate: true })
        }
        useSample={useGradientSample}
      />
      <div className="grid grid-cols-2 items-start gap-choice">
        <Controller
          name="backgroundTop"
          control={control}
          render={({ field }) => (
            <ColorField
              label={horizontal ? "Left color" : "Top color"}
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
              label={horizontal ? "Right color" : "Bottom color"}
              value={field.value}
              onChange={field.onChange}
              triggerRef={field.ref}
            />
          )}
        />
      </div>
      <p className="text-tiny text-grape-700">
        {horizontal
          ? "The bar fades from the left color to the right color."
          : "The bar fades from the top color to the bottom color."}
      </p>
    </Card>
  );
}
