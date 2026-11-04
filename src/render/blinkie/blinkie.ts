import { hexToRgb } from "../../utils/color.ts";
import { ensureFont, layoutGlyphs } from "../font/font.ts";
import { BLINKIE_HEIGHT, BLINKIE_WIDTH, INTERIOR } from "./blinkie.constants.ts";
import { createBitmap } from "./bitmap.ts";
import { paintBorder } from "./border.ts";
import { paintPattern } from "./pattern.ts";
import { chaseSteps, laidOutWidth, paintText } from "./textFlash.ts";
import type { BlinkieDraft, BlinkieFrames, BorderMotion, FontMotion, PatternMotion } from "./blinkie.types.ts";
import type { Glyph } from "../font/font.types.ts";

function gcd(left: number, right: number): number {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b !== 0) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a || 1;
}

function lcm(left: number, right: number): number {
  return (left / gcd(left, right)) * right;
}

function borderCycle(motion: BorderMotion): number {
  if (motion === "pips" || motion === "flash") return 2;
  if (motion === "march" || motion === "bulbs") return 4;
  return 1;
}

function patternCycle(patternId: string, motion: PatternMotion): number {
  if (patternId === "none") return 1;
  if (patternId === "glitter") return 4;
  if (motion === "crawl") return 4;
  if (motion === "blink") return 2;
  return 1;
}

function fontCycle(motion: FontMotion, letters: number): number {
  if (motion === "blink" || motion === "flash") return 2;
  if (motion === "pulse") return 4;
  if (motion === "rainbow") return 6;
  if (motion === "chase") return chaseSteps(letters);
  return 1;
}

function paintFrame(draft: BlinkieDraft, glyphs: Glyph[], frame: number): ImageData {
  const image = createBitmap(BLINKIE_WIDTH, BLINKIE_HEIGHT, hexToRgb(draft.fill));
  paintPattern(
    image,
    INTERIOR,
    draft.patternId,
    draft.patternMotion,
    frame,
    hexToRgb(draft.patternColor),
  );
  paintText(
    image,
    INTERIOR,
    glyphs,
    draft.fontMotion,
    frame,
    hexToRgb(draft.textColor),
    hexToRgb(draft.outlineColor),
    hexToRgb(draft.flashColor),
  );
  paintBorder(
    image,
    { x: 0, y: 0, width: BLINKIE_WIDTH, height: BLINKIE_HEIGHT },
    draft.borderMotion,
    frame,
    hexToRgb(draft.borderColor),
    hexToRgb(draft.accentColor),
  );
  return image;
}

export async function renderBlinkie(draft: BlinkieDraft): Promise<BlinkieFrames> {
  await ensureFont();
  const glyphs = layoutGlyphs(draft.text);
  const letters = glyphs.filter((glyph) => !glyph.space).length;
  const count = lcm(
    borderCycle(draft.borderMotion),
    lcm(patternCycle(draft.patternId, draft.patternMotion), fontCycle(draft.fontMotion, letters)),
  );
  return {
    frames: Array.from({ length: count }, (_, frame) => paintFrame(draft, glyphs, frame)),
    textFits: laidOutWidth(glyphs) + 2 <= INTERIOR.width,
  };
}
