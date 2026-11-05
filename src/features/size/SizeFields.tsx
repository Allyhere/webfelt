import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MAX_HEIGHT, MAX_WIDTH } from "../../constants.ts";
import { badgeRadius, finishBadge, paintBadgeOutline } from "../../render/badge/badgeShape.ts";
import type { BadgeShape } from "../../render/badge/badgeShape.types.ts";
import { toImageData } from "../../render/color/color.ts";
import { createGradientSurface } from "../../render/gradient.ts";
import { Button } from "../../components/Button/Button.tsx";
import { Checkbox } from "../../components/Checkbox/Checkbox.tsx";
import { ChoiceList } from "../../components/ChoiceList/ChoiceList.tsx";
import { NumberField } from "../../components/NumberField/NumberField.tsx";
import { Card } from "../../components/Card/Card.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";
import type { DraftFields } from "../../types.ts";
import { hexToRgb } from "../../utils/color.ts";
import { asRule, heightError, widthError } from "../../utils/draft.ts";

const shapes = [
  { id: "square", label: "Square" },
  { id: "round", label: "Round" },
] as const satisfies readonly { id: BadgeShape; label: string }[];

const SAMPLE = 48;

function useShapeSample(id: BadgeShape): ImageData {
  const { draft } = useUserbarDraft();
  return useMemo(() => {
    const fill = hexToRgb(draft.backgroundTop);
    const fillEnd = hexToRgb(draft.backgroundBottom);
    const border = hexToRgb(draft.border.hex);
    const image = toImageData(
      createGradientSurface(SAMPLE, SAMPLE, fill, fillEnd, draft.gradientAxis),
    );
    const radius = badgeRadius(SAMPLE, SAMPLE, id);
    finishBadge(image, {
      radius,
      bevel: draft.bevel,
      fill,
      fillEnd,
      axis: draft.gradientAxis,
      borderWidth: draft.border.opacity > 0 ? 1 : 0,
    });
    paintBadgeOutline(image, radius, border, draft.border.opacity / 100);
    return image;
  }, [id, draft]);
}

export function SizeFields() {
  const { control, setValue } = useFormContext<DraftFields>();
  const { draft } = useUserbarDraft();

  function chooseSize(width: number, height: number) {
    setValue("width", width, { shouldDirty: true, shouldValidate: true });
    setValue("height", height, { shouldDirty: true, shouldValidate: true });
  }

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
      <div className="flex flex-wrap gap-choice">
        <Button type="button" onPress={() => chooseSize(350, 19)}>
          350 by 19
        </Button>
        <Button type="button" onPress={() => chooseSize(88, 31)}>
          88 by 31
        </Button>
        <Button type="button" onPress={() => chooseSize(32, 32)}>
          32 by 32
        </Button>
      </div>
      <ChoiceList
        label="Corners"
        items={shapes}
        isSelected={(id) => draft.shape === id}
        onSelect={(id) => setValue("shape", id, { shouldDirty: true, shouldValidate: true })}
        useSample={useShapeSample}
      />
      <Controller
        name="bevel"
        control={control}
        render={({ field }) => (
          <Checkbox isSelected={field.value} onChange={field.onChange}>
            Bevel
          </Checkbox>
        )}
      />
      <p className="text-tiny text-grape-700">
        Classic forum bars are 350 by 19 pixels. Badges are 88 by 31. Stamps are 32 by 32. The
        limit is {MAX_WIDTH} by {MAX_HEIGHT}. The bevel is light on the top and left, dark on the
        bottom and right.
      </p>
    </Card>
  );
}
