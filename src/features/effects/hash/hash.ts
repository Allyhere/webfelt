import { HASH_MIX, HASH_RANGE, HASH_SEED, HASH_X, HASH_Y } from "./hash.constants.ts";

export function hashUnit(x: number, y: number, seed: number): number {
  let value = Math.imul(x | 0, HASH_X) + Math.imul(y | 0, HASH_Y);
  value = Math.imul(value + Math.imul(seed | 0, HASH_SEED), HASH_MIX);
  value ^= value >>> 16;
  return (value >>> 0) / HASH_RANGE;
}
