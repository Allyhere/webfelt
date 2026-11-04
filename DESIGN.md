# Userbar Generator design

Neue-Y2K. A 2004 forum signature tool rebuilt with 2026 accessibility: Neocities surfaces (bevelled windows, tiled noise wallpaper, a news ticker, dingbat bullets) on top of React Aria headless components and a strict token set. Everything a screen reader or keyboard user needs comes from React Aria; everything the eye sees comes from this document, mirrored one-to-one in `src/theme.css`.

## Brand

- Name: **Userbar Generator**. Always two words, title case in the title bar, pixel font.
- Voice: short, friendly, forum-era. Sentences end. No exclamation spam except in the ticker, which is allowed exactly one `!!!`.
- Mascot glyphs: dingbats. The site uses them as bullets, window buttons and status marks. They are decorative unless the component gives them a label.
- Motto in the ticker: `welcome to userbar generator · paste an image · pick a pattern · save a PNG · best viewed at any resolution`.

## Wallpaper

The page tiles `public/lavendarnoise.gif` (150 × 150, lavender noise from cinni.net). It is the only raster asset in the chrome. The tile stays at 1:1 scale, repeats on both axes and is fixed to the viewport so windows appear to float over it.

## Color

Token names are what Tailwind generates: `bg-lavender-200`, `text-grape-900`, `border-chrome-dark`.

| Token | Value | Role |
| --- | --- | --- |
| `lavender-50` | `#f4f2ff` | Window body, input body |
| `lavender-100` | `#e6e2fb` | Alternate row, disabled fill |
| `lavender-200` | `#c9c4f0` | Wallpaper tint, track |
| `lavender-400` | `#9b93e0` | Inactive title bar, borders on wallpaper |
| `grape-700` | `#3b2a7a` | Body text, outlines |
| `grape-900` | `#1d1340` | Headings, deep shadow, title bar end |
| `cobalt-500` | `#2341ff` | Title bar start, links |
| `cobalt-700` | `#1428b8` | Link hover, pressed fill |
| `pink-500` | `#ff3ea5` | Focus ring, selected chip, the single hot accent |
| `pink-100` | `#ffd6ec` | Selected chip fill |
| `cyan-300` | `#7ff9ff` | Gloss highlight, ticker text |
| `chrome-light` | `#ffffff` | Bevel top/left |
| `chrome-mid` | `#dedbf3` | Button face |
| `chrome-dark` | `#8a84b8` | Bevel bottom/right |
| `danger-700` | `#b3103c` | Error text |
| `danger-100` | `#ffe0e8` | Error field fill |

Rules:

- Body text is `grape-900` or `grape-700` on `lavender-50`. Both exceed 7:1.
- `pink-500` is never used for body text. It marks focus, selection and the one primary action per window.
- Title bars are the gradient `cobalt-500 → grape-900` with `chrome-light` text.
- Gradients appear only on title bars, the primary button and the gloss strip. Flat colour everywhere else.

## Typography

| Token | Stack | Use |
| --- | --- | --- |
| `font-pixel` | `Tiny5`, monospace | Title bars, legends, buttons, the display heading |
| `font-body` | Verdana, Tahoma, Geneva, "DejaVu Sans", sans-serif | Labels, help text, inputs |
| `font-dings` | "Zapf Dingbats", Webdings, Wingdings, "Segoe UI Symbol", "Apple Symbols", "Noto Sans Symbols 2", sans-serif | Dingbat glyphs |

Sizes:

| Token | Size / line | Use |
| --- | --- | --- |
| `text-tiny` | 11px / 1.4 | Help text, figcaption |
| `text-body` | 13px / 1.5 | Default |
| `text-label` | 12px / 1.4 | Field labels (bold, `grape-700`, no text-transform so screen readers do not spell them) |
| `text-title` | 18px / 1 | Window title bars (pixel) |
| `text-display` | 40px / 1 | Page heading (pixel) |
| `text-ticker` | 16px / 1 | Marquee (pixel) |

Tiny5 is a pixel font and is never set below 16px. Verdana never goes below 11px.

## Dingbats ("webdings")

The site calls them webdings, because that is what the era called them. They render from the Unicode Dingbats block so they work on every OS without shipping a proprietary font. The `Dingbat` component owns the glyph set:

| Name | Glyph | Where |
| --- | --- | --- |
| `star` | ✦ | Bullets, title bar ornament |
| `arrow` | ➜ | Ticker separators, "go" |
| `check` | ✔ | Selected chip |
| `cross` | ✖ | Clear / close |
| `diamond` | ❖ | Section bullets |
| `flower` | ✿ | Footer |
| `note` | ♫ | Ticker |
| `mail` | ✉ | Footer link |
| `scissors` | ✂ | Pattern window ornament |
| `heart` | ❤ | Footer |

A dingbat is `aria-hidden` by default. Pass `label` to make it meaningful; the component then renders the label visually hidden next to the glyph.

## Surfaces

### Window

Every group of controls is a window. A window is:

- Body `bg-lavender-50`, 1px border `grape-900`.
- Outer bevel: `shadow-bevel` = `inset 1px 1px chrome-light, inset -1px -1px chrome-dark, 3px 3px 0 grape-900`.
- Title bar: gradient, `font-pixel text-title text-chrome-light`, padding `px-window py-tight`, left dingbat ornament, right fake window buttons (decorative, `aria-hidden`).
- Content padding `p-window` (12px), rows separated by `gap-row` (8px).
- Radius `rounded-none`. Neue comes from colour and type, not corners.

The title bar is a real heading (`h2`) so windows are landmarks in the outline.

### Input

Text, number and colour fields share one recess: `bg-lavender-50 border border-grape-700 shadow-bevel-in` where `shadow-bevel-in` = `inset 1px 1px chrome-dark, inset -1px -1px chrome-light`. Height `h-control` (32px). Horizontal padding `px-tight`.

Invalid: `bg-danger-100 border-danger-700`, error message `text-danger-700 text-tiny` below.

### Button

- Face `bg-chrome-mid border border-grape-900 shadow-bevel`, `font-pixel text-title text-grape-900`, height `h-control`, padding `px-window`.
- Hover: `bg-lavender-100`.
- Pressed: `shadow-bevel-in translate-y-px` (the classic click).
- Primary (Save): gradient `cobalt-500 → grape-900`, text `chrome-light`.
- Disabled: `text-chrome-dark`, no bevel change, cursor default.

### Chip (ToggleButton)

Pattern and effect swatches. `border border-grape-700 bg-lavender-50 p-tight`, canvas `size-swatch` pixelated. Selected: `bg-pink-100 border-pink-500` and a `check` dingbat. Effects also show their order number.

### Slider

Track `h-track bg-lavender-200 border border-grape-700 shadow-bevel-in`. Fill `bg-cobalt-500`. Thumb `size-thumb bg-chrome-mid border border-grape-900 shadow-bevel`. Output in `font-pixel text-title`.

### Select

Trigger looks like Button at `w-full`. Popover is a window without title bar. Options `px-tight py-tight`, focused `bg-cobalt-500 text-chrome-light`, selected shows `check`.

### Checkbox

An 18px square (`size-check`) with the input recess; checked shows a `check` dingbat in `grape-900`.

### Marquee

A `<div>` with `overflow-hidden`, pill radius, `bg-grape-900 text-cyan-300 font-pixel text-ticker`. The text track is duplicated once so the loop is seamless and runs `animate-marquee` (linear, 28s). It pauses on hover and focus-within, stops under `prefers-reduced-motion`, and has a real Pause/Play toggle so it satisfies WCAG 2.2.2. The HTML `<marquee>` element is not used.

## Focus and states

- Focus ring (every interactive element): `outline-focus outline-pink-500 outline-offset-2` applied only on `data-focus-visible`.
- Hover and pressed states come from React Aria `data-hovered` and `data-pressed`.
- Disabled: `data-disabled` → `text-chrome-dark cursor-default`.
- Motion: anything that moves respects `motion-reduce`.

## Layout

Mobile first, three breakpoints.

| Breakpoint | Layout |
| --- | --- |
| `< md` (48rem) | One column. The Preview window is first so the result is the first thing on screen. It is not sticky; a phone has no room to spare. |
| `md` | Two columns. Preview spans both and sticks to the top, then the left and right stacks. |
| `lg` (64rem) | Three columns `1fr minmax(0, 2fr) 1fr`. Preview is the centre column and sticks; config windows surround it. |

Named areas: `left`, `center`, `right`. Column assignment:

- Left: Size, Background, Pattern.
- Center: Preview (with Save), Text.
- Right: Gloss, Border, Effects, Image.

The page is `header` (title, ticker) → `main` (the grid) → `footer` (dingbat ornaments, keyboard hints). A skip link jumps to `main`.

## Spacing

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
| `thumb` | 16px |
| `track` | 10px |
| `color-area` | 12rem |
| `preview-max` | 44rem |

## Accessibility contract

- Every field has a visible label, provided through React Aria `Label`.
- Errors are announced through React Aria `FieldError`; the form uses React Hook Form rules so the message is the same one validation produced.
- Icons are decorative unless labelled.
- The preview canvas is `role="img"` with the bar text as its label; its caption states the real pixel size.
- Colour is never the only signal: selected chips also show a check and the effect order number.
- Target size is at least 32 × 32 for buttons and 44 px row height for options on touch.
