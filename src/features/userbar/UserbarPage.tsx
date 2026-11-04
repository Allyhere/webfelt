import { Form } from "react-aria-components";
import { Dingbat } from "../../components/Dingbat/Dingbat.tsx";
import { Marquee } from "../../components/Marquee/Marquee.tsx";
import { useUserbarDraft } from "../../hooks/useUserbarDraft.ts";
import { BackgroundFields } from "../colorControls/BackgroundFields.tsx";
import { BorderFields } from "../colorControls/BorderFields.tsx";
import { GlossFields } from "../colorControls/GlossFields.tsx";
import { EffectFields } from "../effects/EffectFields.tsx";
import { ImageFields } from "../image/ImageFields.tsx";
import { PatternFields } from "../patterns/PatternFields.tsx";
import { ResultFields } from "../result/ResultFields.tsx";
import { SizeFields } from "../size/SizeFields.tsx";
import { TextFields } from "../text/TextFields.tsx";

export function UserbarPage() {
  const { form, save } = useUserbarDraft();
  return (
    <div className="mx-auto grid max-w-page gap-section p-gutter md:p-section">
      <a
        href="#stage"
        className="sr-only focus:not-sr-only focus:fixed focus:top-gutter focus:left-gutter focus:z-10 focus:border focus:border-grape-900 focus:bg-lavender-50 focus:px-window focus:py-tight focus:font-pixel focus:text-title focus:text-grape-900 focus:shadow-bevel focus:focus-ring"
      >
        Skip to the generator
      </a>
      <header className="grid gap-gutter">
        <div className="flex flex-wrap items-end justify-between gap-gutter">
          <h1 className="font-pixel text-display text-grape-900">
            <Dingbat name="star" className="text-pink-500" /> Userbar Generator
          </h1>
          <p className="max-w-preview text-body text-grape-700">
            Glossy forum signature bars, rendered pixel by pixel in your browser. Nothing is
            uploaded.
          </p>
        </div>
        <Marquee>
          welcome to userbar generator · paste an image · pick a pattern · save a PNG · best
          viewed at any resolution !!!
        </Marquee>
      </header>
      <main id="stage">
        <Form
          onSubmit={(event) => {
            void form.handleSubmit(save)(event);
          }}
          className="layout-stage"
        >
          <div className="area-center grid content-start gap-gutter">
            <div className="md:sticky md:top-gutter">
              <ResultFields />
            </div>
            <TextFields />
          </div>
          <div className="area-left grid content-start gap-gutter">
            <SizeFields />
            <BackgroundFields />
            <PatternFields />
          </div>
          <div className="area-right grid content-start gap-gutter">
            <GlossFields />
            <BorderFields />
            <EffectFields />
            <ImageFields />
          </div>
        </Form>
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-choice border-t border-grape-700 pt-gutter text-tiny text-grape-700">
        <p>
          <Dingbat name="flower" className="text-pink-500" /> Tab moves between controls. Space
          toggles a chip. Arrow keys move sliders.
        </p>
        <p>
          <Dingbat name="heart" className="text-pink-500" /> Userbar Generator{" "}
          <Dingbat name="flower" className="text-pink-500" />
        </p>
      </footer>
    </div>
  );
}
