import { useState } from "react";
import { ToggleButton } from "react-aria-components";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { MarqueeProps } from "./Marquee.types.ts";

export function Marquee({ children }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="group flex items-center gap-choice overflow-hidden rounded-pill border-2 border-grape-900 bg-grape-900 pl-tight shadow-sticker">
      <ToggleButton
        isSelected={paused}
        onChange={setPaused}
        aria-label={paused ? "Play ticker" : "Pause ticker"}
        className="grid size-control shrink-0 cursor-pointer place-items-center rounded-pill text-cyan-300 data-hovered:bg-grape-700 data-focus-visible:focus-ring"
      >
        <Dingbat name={paused ? "arrow" : "note"} />
      </ToggleButton>
      <div className="min-w-0 flex-1 overflow-hidden py-choice" aria-live="off">
        <div
          data-paused={paused || undefined}
          className="flex w-max animate-marquee gap-section font-pixel text-ticker whitespace-nowrap text-cyan-300 group-hover:marquee-paused group-focus-within:marquee-paused data-paused:marquee-paused motion-reduce:animate-none"
        >
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </div>
      </div>
    </div>
  );
}
