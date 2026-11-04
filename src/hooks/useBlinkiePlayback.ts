import { useEffect, useState } from "react";

export function useBlinkiePlayback(frameCount: number, delayCentiseconds: number, hold: boolean): number {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (hold || frameCount <= 1) return;
    const id = window.setInterval(() => {
      setFrame((current) => (current + 1) % frameCount);
    }, delayCentiseconds * 10);
    return () => window.clearInterval(id);
  }, [hold, frameCount, delayCentiseconds]);

  if (hold || frameCount <= 1) return 0;
  return frame % Math.max(frameCount, 1);
}
