export function hashUnit(x: number, y: number, seed: number): number {
  let value = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  value = Math.imul(value + Math.imul(seed | 0, 1442695041), 1274126177);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
}
