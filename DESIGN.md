# Userbar Generator design

Neue-Y2K, personal-site flavour. The app reads like a small Neocities blog: a tiled noise wallpaper, a hand-made header, a news ticker, boxed sidebars with dotted rules and dingbat bullets, and one "post" in the middle that happens to be a live userbar. No window chrome, no bevels, no fake title bars. React Aria provides every behaviour a screen reader or keyboard user needs; this document provides every pixel, and `src/theme.css` mirrors it one-to-one.

## Brand

- Name: **Userbar Generator**. Two words, pixel font, title case.
- Voice: short, friendly, forum-era. Sentences end. No exclamation spam except in the ticker, which is allowed exactly one `!!!`.
- Mascot glyphs: dingbats. They are bullets, rules and status marks, never buttons. Decorative unless the component gives them a label.
- Motto in the ticker: `welcome to userbar generator · paste an image · pick a pattern · save a PNG · best viewed at any resolution`.

## Wallpaper

The page tiles `public/lavendarnoise.gif` (150 × 150, lavender noise from cinni.net). It is the only raster asset in the chrome. The tile stays at 1:1 scale, repeats on both axes and is fixed to the viewport so the cards appear to sit on it.

## Color

Token names are what Tailwind generates: `bg-lavender-200`, `text-grape-900`, `border-grape-700`.

| Token | Value | Role |
| --- | --- | --- |
| `lavender-50` | `#f4f2ff` | Card body |
| `lavender-100` | `#e6e2fb` | Preview mat, hover fill, disabled fill |
| `lavender-200` | `#c9c4f0` | Wallpaper tint, slider track |
| `lavender-400` | `#9b93e0` | Dotted rules, chip borders, muted glyphs |
| `grape-700` | `#3b2a7a` | Body text, input borders |
| `grape-900` | `#1d1340` | Headings, card borders, sticker shadow |
| `cobalt-500` | `#2341ff` | Links, slider fill, focused option |
| `cobalt-700` | `#1428b8` | Link hover |
| `pink-500` | `#ff3ea5` | Focus ring, selected chip, the one primary button |
| `pink-600` | `#e62a8f` | Primary button hover |
| `pink-100` | `#ffd6ec` | Selected chip fill |
| `cyan-300` | `#7ff9ff` | Ticker text, heading dingbats on dark |
| `paper` | `#ffffff` | Input and button faces |
| `danger-700` | `#b3103c` | Error text |
| `danger-100` | `#ffe0e8` | Error field fill |

Rules:

- Body text is `grape-900` or `grape-700` on `lavender-50` or `paper`. Both exceed 7:1.
- `pink-500` is never body text. It marks focus, selection and the single primary action on the page (Save).
- No gradients. Depth comes from one hard offset shadow (`shadow-sticker`) and dotted rules, the way a blog theme stacked boxes.

## Typography

| Token | Stack | Use |
| --- | --- | --- |
| `font-pixel` | `Tiny5`, monospace | Site title, card headings, buttons, slider values |
| `font-body` | Verdana, Tahoma, Geneva, "DejaVu Sans", sans-serif | Labels, help text, inputs, options |
| `font-dings` | "Zapf Dingbats", Webdings, Wingdings, "Segoe UI Symbol", "Apple Symbols", "Noto Sans Symbols 2", sans-serif | Dingbat glyphs |

Sizes:

| Token | Size / line | Use |
| --- | --- | --- |
| `text-tiny` | 11px / 1.4 | Help text, figcaption, footer |
| `text-body` | 13px / 1.5 | Default |
| `text-label` | 12px / 1.4 | Field labels (bold, `grape-700`, no text-transform so screen readers do not spell them) |
| `text-title` | 18px / 1 | Card headings, buttons (pixel) |
| `text-display` | 40px / 1 | Site title (pixel) |
| `text-ticker` | 16px / 1 | Marquee (pixel) |

Tiny5 is a pixel font and is never set below 16px. Verdana never goes below 11px.

## Dingbats ("webdings")

The site calls them webdings, because that is what the era called them. They render from the Unicode Dingbats block so they work on every OS without shipping a proprietary font. The `Dingbat` component owns the glyph set:

| Name | Glyph | Where |
| --- | --- | --- |
| `star` | ✦ | Site title, card bullets |
| `arrow` | ➜ | Select caret, Save, Play |
| `check` | ✔ | Selected chip, selected option, checkbox |
| `cross` | ✖ | Clear |
| `diamond` | ❖ | Card bullets |
| `flower` | ✿ | Footer, dotted rule ornament |
| `note` | ♫ | Ticker |
| `mail` | ✉ | Image card bullet |
| `scissors` | ✂ | Pattern card bullet |
| `heart` | ❤ | Preview card bullet, footer |

A dingbat is `aria-hidden` by default. Pass `label` to make it meaningful; the component then renders the label visually hidden next to the glyph.

## Surfaces

### Card

Every group of controls is a card, the "sidebar box" of a blog theme.

- `rounded-card border-3 border-double border-grape-900 bg-lavender-50 shadow-sticker`.
- Padding `p-window` (12px); rows separated by `gap-row` (8px).
- Heading: a real `h2`, `font-pixel text-title text-grape-900`, led by a dingbat in `pink-500`, closed by a dotted rule `border-b border-dotted border-lavender-400 pb-tight`.
- The card is a `section` labelled by its heading, so cards are landmarks in the outline.
- Dragging the card title, or the padding around its fields, moves that card with `translate3d`. The grid cell stays where it is, so the other cards do not reflow. Buttons, fields, sliders, and chips do not start a drag.

### Input

Text, number and colour fields share one face: `rounded-control border border-grape-700 bg-paper inset-shadow-soft`, height `h-control` (32px), horizontal padding `px-choice`.

Invalid: `bg-danger-100 border-danger-700`, error message `text-danger-700 text-tiny` below.

### Button

- Face `rounded-control border-2 border-grape-900 bg-paper shadow-sticker`, `font-pixel text-title text-grape-900`, height `h-control`, padding `px-window`.
- Hover: `bg-lavender-100`.
- Pressed: `translate-x-px translate-y-px shadow-none` (the sticker gets pushed flat).
- Primary (Save): `bg-pink-500 text-paper`, hover `bg-pink-600`.
- Disabled: `text-lavender-400 border-lavender-400 shadow-none`, cursor default.

### Chip (ToggleButton)

Pattern and effect swatches. `rounded-control border-2 border-dotted border-lavender-400 bg-paper p-tight`, canvas `size-swatch` pixelated. Hover `bg-lavender-100`. Selected: `border-solid border-pink-500 bg-pink-100` plus a `check` dingbat; effects also show their order number.

Pattern and effect lists use `choice-grid`: `repeat(auto-fit, minmax(min(100%, chip), 1fr))` with `gap-choice`. Every chip fills its cell, so pattern and effect cards share one size. The caption uses `chip-label`, a minimum height of `text-title`, so the effect order number does not make its row taller. The `min(100%, …)` keeps a single column from overflowing a narrow card.

### Slider

Track `h-track rounded-pill bg-lavender-200 border border-grape-700`. Fill `bg-cobalt-500`. Thumb `size-thumb rounded-pill bg-paper border-2 border-grape-900 shadow-sticker-soft`. Output in `font-pixel text-title`.

### Select

Trigger uses the Input face with an `arrow` dingbat rotated down. Popover `rounded-control border border-grape-700 bg-paper shadow-sticker`. Options `min-h-option px-choice`, focused `bg-cobalt-500 text-paper`, selected shows `check`.

### Checkbox

An 18px `rounded-control` square with the Input face; checked shows a `check` dingbat in `grape-900`.

### Marquee

A pill: `rounded-pill border-2 border-grape-900 bg-grape-900 text-cyan-300 font-pixel text-ticker shadow-sticker`. The text track is duplicated once so the loop is seamless and runs `animate-marquee` (linear, 28s). It pauses on hover and focus-within, stops under `prefers-reduced-motion`, and has a real Pause/Play toggle so it satisfies WCAG 2.2.2. The HTML `<marquee>` element is not used.

### Preview mat

The canvas sits on `rounded-control border border-dotted border-lavender-400 bg-lavender-100 p-window`, centred, scaled with `preview` (2×, shrinking on narrow screens with its aspect ratio kept).

## Focus and states

- Focus ring (every interactive element): `focus-ring` = 3px `pink-500` outline, 2px offset, applied only on `data-focus-visible`.
- Hover and pressed states come from React Aria `data-hovered` and `data-pressed`.
- Disabled: `data-disabled` → muted border and text, cursor default.
- Motion: anything that moves respects `motion-reduce`.

## Layout

A three-column blog: left sidebar, post, right sidebar. Mobile first.

| Breakpoint | Layout |
| --- | --- |
| `< md` (48rem) | One column. The Preview card is first so the result is the first thing on screen. Not sticky. |
| `md` | Two columns. Preview spans both and sticks to the top, then the left and right stacks. |
| `lg` (64rem) | `1fr minmax(0, 2fr) 1fr`. The post (Preview, then Text) is the centre column and sticks; sidebars surround it. |

Named areas: `left`, `center`, `right`.

- Left sidebar: Size, Background, Pattern.
- Post: Preview (with Save), Text.
- Right sidebar: Gloss, Border, Effects, Image.

The page is `header` (site title with dingbat, tagline, meta line, ticker) → `main` (the grid) → `footer` (dotted rule, keyboard hints, sign-off). A skip link jumps to `main`.

The header links to the blinkie page. That page uses this same chrome, the same cards, and the same preview mat. Its canvas is fixed at 150×20. Three chip groups pick a border motion, a pattern motion, and a font flash. The preview plays those frames, and it holds the first frame while Pause is on or `prefers-reduced-motion` is set. The download is a GIF.

## Spacing and shape

| Token | Value |
| --- | --- |
| `tight` | 4px |
| `choice` | 8px |
| `row` | 8px |
| `window` | 12px |
| `gutter` | 16px |
| `section` | 24px |
| `control` | 32px (height of inputs and buttons) |
| `check` | 18px |
| `swatch` | 48px |
| `chip` | 8rem (minimum column for a pattern or effect chip) |
| `thumb` | 18px |
| `track` | 10px |
| `option` | 44px (option row height) |
| `color-area` | 12rem |
| `preview` (container) | 44rem |
| `page` (container) | 90rem |
| `radius-control` | 6px |
| `radius-card` | 12px |
| `radius-pill` | 999px |
| `shadow-sticker` | `3px 3px 0 grape-900` |
| `shadow-sticker-soft` | `2px 2px 0 lavender-400` |
| `inset-shadow-soft` | `inset 0 1px 2px grape-900 at 15 %` |

## Accessibility contract

- Every field has a visible label, provided through React Aria `Label`.
- Errors are announced through React Aria `FieldError`; the form uses React Hook Form rules so the message is the same one validation produced.
- Icons are decorative unless labelled.
- The preview canvas is `role="img"` with the bar text as its label; its caption states the real pixel size.
- Colour is never the only signal: selected chips also show a check and the effect order number.
- Target size is at least 32 × 32 for buttons and 44 px row height for options on touch.
