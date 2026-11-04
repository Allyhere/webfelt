import { drawPixel, rgbaToLinear, type Surface } from "./color.ts";
import { layoutText } from "./font.ts";
import { axisOffset, type Placement, type Rgba } from "./types.ts";

function paintColumn(
  surface: Surface,
  column: Uint8Array,
  originX: number,
  originY: number,
  color: ReturnType<typeof rgbaToLinear>,
  outline: boolean,
): void {
  for (let y = 0; y < column.length; y += 1) {
    if (column[y] !== 1) continue;
    if (!outline) {
      drawPixel(surface, originX, originY + y, color);
      continue;
    }
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        drawPixel(surface, originX + dx, originY + y + dy, color);
      }
    }
  }
}

export function drawText(
  surface: Surface,
  text: string,
  fill: Rgba,
  outline: Rgba,
  placement: Placement,
): void {
  const columns = layoutText(text);
  const rows = columns[0]?.length ?? 0;
  if (columns.length === 0 || rows === 0) return;
  const originX =
    axisOffset(
      placement.horizontal,
      placement.horizontalDistance,
      columns.length + 2,
      surface.width,
    ) + 1;
  const originY =
    axisOffset(
      placement.vertical,
      placement.verticalDistance,
      rows + 2,
      surface.height,
    ) + 1;

  if (outline.a > 0) {
    const color = rgbaToLinear(outline);
    for (let x = 0; x < columns.length; x += 1) {
      paintColumn(surface, columns[x], originX + x, originY, color, true);
    }
  }
  if (fill.a > 0) {
    const color = rgbaToLinear(fill);
    for (let x = 0; x < columns.length; x += 1) {
      paintColumn(surface, columns[x], originX + x, originY, color, false);
    }
  }
}
