import { useEffect, type RefObject } from "react";
import { paintCanvas } from "../utils/canvas.ts";

export function useCanvasPaint(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  image: ImageData | null,
): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    paintCanvas(canvas, image);
  }, [canvasRef, image]);
}
