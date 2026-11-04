import type { Surface } from "../color.ts";
import { copySurface } from "./buffer.ts";
import { blur } from "./blur/blur.ts";
import { bulge } from "./bulge/bulge.ts";
import { emboss } from "./emboss/emboss.ts";
import { glitch } from "./glitch/glitch.ts";
import { grain } from "./grain/grain.ts";
import { motionBlur } from "./motionBlur/motionBlur.ts";
import { pixelate } from "./pixelate/pixelate.ts";
import { posterize } from "./posterize/posterize.ts";
import { split } from "./split/split.ts";
import { warp } from "./warp/warp.ts";
import { wave } from "./wave/wave.ts";

export function applyEffect(surface: Surface, effectId: string): void {
  if (effectId === "none") return;
  const source = copySurface(surface);
  switch (effectId) {
    case "wave":
      wave(source, surface);
      break;
    case "glitch":
      glitch(source, surface);
      break;
    case "split":
      split(source, surface);
      break;
    case "pixelate":
      pixelate(source, surface);
      break;
    case "grain":
      grain(source, surface);
      break;
    case "posterize":
      posterize(source, surface);
      break;
    case "blur":
      blur(source, surface);
      break;
    case "motion":
      motionBlur(source, surface);
      break;
    case "emboss":
      emboss(source, surface);
      break;
    case "warp":
      warp(source, surface);
      break;
    case "bulge":
      bulge(source, surface);
      break;
    default:
      break;
  }
}
