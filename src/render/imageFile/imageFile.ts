import { NOT_IMAGE, UNREADABLE } from "./imageFile.constants.ts";

export function readImageFile(file: File): Promise<ImageData> {
  if (file.type && !file.type.startsWith("image/")) {
    return Promise.reject(new Error(NOT_IMAGE));
  }
  const url = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context || canvas.width < 1 || canvas.height < 1) {
        reject(new Error(UNREADABLE));
        return;
      }
      context.drawImage(image, 0, 0);
      resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(UNREADABLE));
    };
    image.src = url;
  });
}
