import { useEffect, useState } from "react";
import { renderUserbar } from "../render/userbar.ts";
import type { Draft } from "../types.ts";
import { toOptions } from "../utils/draft.ts";

export function useRenderedUserbar(draft: Draft, canRender: boolean): ImageData | null {
  const [image, setImage] = useState<ImageData | null>(null);

  useEffect(() => {
    if (!canRender) return;
    let cancelled = false;
    void renderUserbar(toOptions(draft)).then((next) => {
      if (!cancelled) setImage(next);
    });
    return () => {
      cancelled = true;
    };
  }, [draft, canRender]);

  return image;
}
