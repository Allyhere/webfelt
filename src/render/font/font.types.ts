export type FontFace = {
  top: number;
  height: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

export type InkBounds = {
  top: number;
  bottom: number;
};

export type Glyph = {
  columns: Uint8Array[];
  space: boolean;
};
