import { useId } from "react";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";
import { PlacementFields } from "../../components/PlacementFields/PlacementFields.tsx";

export function ImageFields() {
  const { draft, update, storeImage, fileRef } = useUserbarDraft();
  const fileId = useId();
  return (
    <fieldset>
      <legend>Background image</legend>
      <label htmlFor={fileId}>
        Image file{" "}
        <input
          id={fileId}
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) storeImage(file, "Choose an image file.");
          }}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          update({ backgroundImage: null });
          if (fileRef.current) fileRef.current.value = "";
        }}
      >
        Clear
      </button>
      <p>You can also paste an image while this text field is not focused.</p>
      <PlacementFields
        legend="Image placement"
        placement={draft.imagePlacement}
        onChange={(imagePlacement) => update({ imagePlacement })}
      />
    </fieldset>
  );
}
