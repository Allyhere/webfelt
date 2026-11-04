export type RectShape = {
  kind: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
};

export type CircleShape = {
  kind: "circle";
  cx: number;
  cy: number;
  r: number;
  opacity: number;
};

export type LineShape = {
  kind: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth: number;
  opacity: number;
};

export type Shape = RectShape | CircleShape | LineShape;

export type Tile = {
  width: number;
  height: number;
  shapes: Shape[];
};
