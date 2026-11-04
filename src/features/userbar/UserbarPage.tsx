import { BackgroundFields } from "../colorControls/BackgroundFields.tsx";
import { BorderFields } from "../colorControls/BorderFields.tsx";
import { EffectFields } from "../effects/EffectFields.tsx";
import { GlossFields } from "../colorControls/GlossFields.tsx";
import { ImageFields } from "../image/ImageFields.tsx";
import { PatternFields } from "../patterns/PatternFields.tsx";
import { ResultFields } from "../result/ResultFields.tsx";
import { SizeFields } from "../size/SizeFields.tsx";
import { TextFields } from "../text/TextFields.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";

export function UserbarPage() {
  const { alertMessage } = useUserbarDraft();
  return (
    <main>
      <h1>Userbar generator</h1>
      <p>
        You can turn off gloss, the border, and the pattern by setting their
        opacity to zero.
      </p>
      {alertMessage ? <p role="alert">{alertMessage}</p> : null}
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <SizeFields />
        <BackgroundFields />
        <TextFields />
        <GlossFields />
        <BorderFields />
        <PatternFields />
        <EffectFields />
        <ImageFields />
        <ResultFields />
      </form>
    </main>
  );
}
