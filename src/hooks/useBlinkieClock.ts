import { useContext } from "react";
import { BlinkieClockContext } from "../context/BlinkieClockContext.ts";

export function useBlinkieClock(): number {
  return useContext(BlinkieClockContext);
}
