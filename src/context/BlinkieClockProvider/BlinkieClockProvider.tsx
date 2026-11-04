import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.ts";
import { BlinkieClockContext } from "../BlinkieClockContext.ts";
import type { BlinkieClockProviderProps } from "./BlinkieClockProvider.types.ts";

export function BlinkieClockProvider({ children }: BlinkieClockProviderProps) {
  const reduced = usePrefersReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setFrame((current) => (current + 1) % 12);
    }, 160);
    return () => window.clearInterval(id);
  }, [reduced]);

  return <BlinkieClockContext value={reduced ? 0 : frame}>{children}</BlinkieClockContext>;
}
