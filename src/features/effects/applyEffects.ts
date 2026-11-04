import type { Surface } from "../../render/color/color.types.ts";
import { copySurface } from "./buffer/buffer.ts";
import { blur } from "./blur/blur.ts";
import { bulge } from "./bulge.ts";
import { emboss } from "./emboss/emboss.ts";
import { glitch } from "./glitch.ts";
import { grain } from "./grain.ts";
import { motionBlur } from "./motionBlur/motionBlur.ts";
import { pixelate } from "./pixelate/pixelate.ts";
import { posterize } from "./posterize/posterize.ts";
import { split } from "./split.ts";
import { warp } from "./warp/warp.ts";
import { wave } from "./wave.ts";

type EffectFn = (source: Surface, destination: Surface) => void;

const effects: Record<string, EffectFn> = {
  wave,
  glitch,
  split,
  pixelate,
  grain,
  posterize,
  blur,
  motion: motionBlur,
  emboss,
  warp,
  bulge,
};

export function applyEffect(surface: Surface, effectId: string): void {
  const effect = effects[effectId];
  if (!effect) return;
  effect(copySurface(surface), surface);
}

export function applyEffects(surface: Surface, effectIds: string[]): void {
  for (const effectId of effectIds) applyEffect(surface, effectId);
}
