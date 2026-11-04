import { useId } from "react";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { WindowProps } from "./Window.types.ts";

export function Window({ title, ornament = "star", className = "", children }: WindowProps) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className={`border border-grape-900 bg-lavender-50 shadow-bevel ${className}`}
    >
      <h2 className="bg-titlebar flex items-center gap-choice px-window py-tight font-pixel text-title text-chrome-light">
        <Dingbat name={ornament} className="text-cyan-300" />
        <span id={headingId} className="min-w-0 flex-1 truncate">
          {title}
        </span>
        <span aria-hidden="true" className="flex gap-tight text-label">
          <span className="grid size-check place-items-center border border-grape-900 bg-chrome-mid font-body font-bold text-grape-900 shadow-bevel-flat">
            _
          </span>
          <span className="grid size-check place-items-center border border-grape-900 bg-chrome-mid text-grape-900 shadow-bevel-flat">
            <Dingbat name="cross" />
          </span>
        </span>
      </h2>
      <div className="grid gap-row p-window">{children}</div>
    </section>
  );
}
