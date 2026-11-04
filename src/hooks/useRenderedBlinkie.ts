import { useEffect, useState } from "react";
import { renderBlinkie } from "../render/blinkie/blinkie.ts";
import type { BlinkieDraft, BlinkieFrames } from "../render/blinkie/blinkie.types.ts";

export function useRenderedBlinkie(draft: BlinkieDraft): BlinkieFrames | null {
  const [result, setResult] = useState<BlinkieFrames | null>(null);

  useEffect(() => {
    let cancelled = false;
    void renderBlinkie(draft).then((next) => {
      if (!cancelled) setResult(next);
    });
    return () => {
      cancelled = true;
    };
  }, [draft]);

  return result;
}
