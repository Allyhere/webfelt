import { useId } from "react";
import { DraggableCore } from "react-draggable";
import { useCardDrag } from "../../hooks/useCardDrag.ts";
import { Dingbat } from "../Dingbat/Dingbat.tsx";
import type { CardProps } from "./Card.types.ts";

export function Card({ title, bullet = "star", className = "", children }: CardProps) {
  const headingId = useId();
  const { nodeRef, onStart, onDrag, onStop } = useCardDrag();
  return (
    <DraggableCore
      nodeRef={nodeRef}
      onStart={onStart}
      onDrag={onDrag}
      onStop={onStop}
      cancel="button, a, input, textarea, select, label, [role='slider'], [role='spinbutton'], [role='checkbox'], [role='radio'], [role='switch'], [role='combobox'], [role='listbox'], [role='option'], [role='group'], [role='dialog']"
    >
      <section
        ref={nodeRef}
        aria-labelledby={headingId}
        className={`card-layer grid gap-row rounded-card border-3 border-double border-grape-900 bg-lavender-50 p-window shadow-sticker ${className}`}
      >
        <h2 className="flex cursor-grab items-center gap-choice border-b border-dotted border-lavender-400 pb-tight font-pixel text-title text-grape-900 select-none">
          <Dingbat name={bullet} className="text-pink-500" />
          <span id={headingId} className="min-w-0 flex-1 truncate">
            {title}
          </span>
        </h2>
        {children}
      </section>
    </DraggableCore>
  );
}
