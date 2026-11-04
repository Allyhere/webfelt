import type { Surface } from "../color.ts";

export type EffectFn = (source: Surface, destination: Surface) => void;
