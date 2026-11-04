export function paintCanvas(canvas: HTMLCanvasElement, image: ImageData): void {
  const context = canvas.getContext("2d");
  if (!context) return;
  canvas.width = image.width;
  canvas.height = image.height;
  context.putImageData(image, 0, 0);
}

export function downloadCanvasPng(canvas: HTMLCanvasElement): void {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "userbar.png";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}
