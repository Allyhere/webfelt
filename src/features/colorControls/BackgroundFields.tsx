import { useId } from "react";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";

export function BackgroundFields() {
  const { draft, update } = useUserbarDraft();
  const topId = useId();
  const bottomId = useId();
  return (
    <fieldset>
      <legend>Background</legend>
      <label htmlFor={topId}>
        Top color{" "}
        <input
          id={topId}
          type="color"
          value={draft.backgroundTop}
          onChange={(event) => update({ backgroundTop: event.target.value })}
        />
      </label>
      <label htmlFor={bottomId}>
        Bottom color{" "}
        <input
          id={bottomId}
          type="color"
          value={draft.backgroundBottom}
          onChange={(event) => update({ backgroundBottom: event.target.value })}
        />
      </label>
    </fieldset>
  );
}
