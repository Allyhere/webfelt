import { Form } from "react-aria-components";
import { Dingbat } from "../../components/Dingbat/Dingbat.tsx";
import { Marquee } from "../../components/Marquee/Marquee.tsx";
import { BlinkieClockProvider } from "../../context/BlinkieClockProvider/BlinkieClockProvider.tsx";
import { useBlinkieDraft } from "../../hooks/useBlinkieDraft.ts";
import { BlinkieBackgroundFields } from "./BlinkieBackgroundFields.tsx";
import { BlinkieBorderFields } from "./BlinkieBorderFields.tsx";
import { BlinkieFormatFields } from "./BlinkieFormatFields.tsx";
import { BlinkiePatternFields } from "./BlinkiePatternFields.tsx";
import { BlinkiePreview } from "./BlinkiePreview.tsx";
import { BlinkieTextFields } from "./BlinkieTextFields.tsx";
import type { BlinkiePageProps } from "./BlinkiePage.types.ts";

export function BlinkiePage({ onShowUserbars }: BlinkiePageProps) {
  const { form, save } = useBlinkieDraft();
  return (
    <div className="mx-auto grid max-w-page gap-section p-gutter md:p-section">
      <a
        href="#stage"
        className="sr-only focus:not-sr-only focus:fixed focus:top-gutter focus:left-gutter focus:z-10 focus:rounded-control focus:border-2 focus:border-grape-900 focus:bg-paper focus:px-window focus:py-tight focus:font-pixel focus:text-title focus:text-grape-900 focus:shadow-sticker focus:focus-ring"
      >
        Skip to the generator
      </a>
      <header className="grid gap-gutter">
        <div className="grid gap-choice">
          <h1 className="font-pixel text-display text-grape-900">
            <Dingbat name="star" className="text-pink-500" /> Blinkie Generator
          </h1>
          <p className="max-w-preview text-body text-grape-700">
            Tiny looping badges, painted pixel by pixel in your browser. Nothing is uploaded.
          </p>
          <nav className="flex flex-wrap items-center gap-choice text-tiny" aria-label="Generators">
            <button
              type="button"
              onClick={onShowUserbars}
              className="cursor-pointer text-cobalt-500 underline hover:text-cobalt-700 focus-visible:focus-ring"
            >
              Userbars
            </button>
            <Dingbat name="diamond" className="text-lavender-400" />
            <span aria-current="page" className="font-bold text-grape-900">
              Blinkies
            </span>
          </nav>
          <p className="flex flex-wrap items-center gap-choice text-tiny text-grape-700">
            <span>a tiny tool</span>
            <Dingbat name="diamond" className="text-lavender-400" />
            <span>no accounts, no uploads</span>
            <Dingbat name="diamond" className="text-lavender-400" />
            <span>free forever</span>
          </p>
        </div>
        <Marquee>
          welcome to blinkie generator · march a border · crawl a pattern · flash the type · save
          a GIF · best viewed at any resolution !!!
        </Marquee>
      </header>
      <main id="stage">
        <BlinkieClockProvider>
          <Form
            onSubmit={(event) => {
              void form.handleSubmit(save)(event);
            }}
            className="layout-stage"
          >
            <div className="area-center grid content-start gap-gutter">
              <div className="md:sticky md:top-gutter">
                <BlinkiePreview />
              </div>
              <BlinkieTextFields />
            </div>
            <div className="area-left grid content-start gap-gutter">
              <BlinkieFormatFields />
              <BlinkieBackgroundFields />
              <BlinkiePatternFields />
            </div>
            <div className="area-right grid content-start gap-gutter">
              <BlinkieBorderFields />
            </div>
          </Form>
        </BlinkieClockProvider>
      </main>
      <footer className="grid gap-choice border-t-2 border-dotted border-grape-700 pt-gutter text-tiny text-grape-700">
        <p className="flex flex-wrap items-center gap-choice">
          <Dingbat name="flower" className="text-pink-500" />
          <span>
            Tab moves between controls. Space toggles a chip. Arrow keys move sliders. Drag a
            card from its title.
          </span>
        </p>
        <p className="flex flex-wrap items-center gap-choice">
          <Dingbat name="heart" className="text-pink-500" />
          <span>Blinkie Generator. Made by hand, like the badges.</span>
          <Dingbat name="flower" className="text-pink-500" />
        </p>
      </footer>
    </div>
  );
}
