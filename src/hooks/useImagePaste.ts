import { useEffect } from "react";
import { isTypingTarget } from "../utils/dom.ts";
import { pastedImage } from "../utils/image.ts";

export function useImagePaste(
  onImage: (file: File) => void,
  onReject: () => void,
): void {
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      if (isTypingTarget(event.target)) return;
      const files = event.clipboardData?.files;
      if (!files || files.length === 0) return;
      const file = pastedImage(files);
      if (!file) {
        onReject();
        return;
      }
      event.preventDefault();
      onImage(file);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [onImage, onReject]);
}
