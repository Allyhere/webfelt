import { Controller, useFormContext } from "react-hook-form";
import { Button } from "../../components/Button/Button.tsx";
import { Dingbat } from "../../components/Dingbat/Dingbat.tsx";
import { FileField } from "../../components/FileField/FileField.tsx";
import { PlacementFields } from "../../components/PlacementFields/PlacementFields.tsx";
import { Window } from "../../components/Window/Window.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";
import type { DraftFields } from "../../types.ts";

export function ImageFields() {
  const { draft, storeImage, clearImage } = useUserbarDraft();
  const { control } = useFormContext<DraftFields>();
  const image = draft.backgroundImage;
  return (
    <Window title="Background image" ornament="mail">
      <div className="flex flex-wrap items-center gap-choice">
        <FileField
          acceptedFileTypes={["image/*"]}
          onSelect={(file) => storeImage(file, "Choose an image file.")}
        >
          Choose image
        </FileField>
        <Button onPress={clearImage} isDisabled={image === null}>
          <Dingbat name="cross" />
          Clear
        </Button>
      </div>
      <p className="text-tiny text-grape-700" aria-live="polite">
        {image
          ? `Loaded a ${image.width} by ${image.height} pixel image.`
          : "No image yet. You can also paste one from the clipboard while no text field is focused."}
      </p>
      <Controller
        name="imagePlacement"
        control={control}
        render={({ field }) => (
          <PlacementFields
            legend="Image placement"
            placement={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </Window>
  );
}
