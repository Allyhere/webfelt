import { useId } from "react";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { CardProps } from "./Card.types.ts";

export function Card({ title, bullet = "star", className = "", children }: CardProps) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className={`grid gap-row rounded-card border-3 border-double border-grape-900 bg-lavender-50 p-window shadow-sticker ${className}`}
    >
      <h2 className="flex items-center gap-choice border-b border-dotted border-lavender-400 pb-tight font-pixel text-title text-grape-900">
        <Dingbat name={bullet} className="text-pink-500" />
        <span id={headingId} className="min-w-0 flex-1 truncate">
          {title}
        </span>
      </h2>
      {children}
    </section>
  );
}
