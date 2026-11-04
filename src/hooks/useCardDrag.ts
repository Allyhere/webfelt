import { useRef } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";

const visibleEdge = 48;
let raisedCardCount = 0;

function clamp(value: number, a: number, b: number) {
  const low = Math.min(a, b);
  const high = Math.max(a, b);
  return Math.min(high, Math.max(low, value));
}

export function useCardDrag() {
  const nodeRef = useRef<HTMLElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const frame = useRef({ left: 0, top: 0, width: 0, height: 0 });

  const place = (x: number, y: number) => {
    offset.current.x = x;
    offset.current.y = y;
    const node = nodeRef.current;
    if (!node) return;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onStart = () => {
    const node = nodeRef.current;
    if (!node) return false;
    const rect = node.getBoundingClientRect();
    frame.current = {
      left: rect.left - offset.current.x,
      top: rect.top - offset.current.y,
      width: rect.width,
      height: rect.height,
    };
    raisedCardCount += 1;
    const layer = String(raisedCardCount);
    node.style.setProperty("--card-layer", layer);
    let ancestor = node.parentElement;
    while (ancestor && ancestor !== document.body) {
      if (ancestor.classList.contains("layout-stage")) break;
      ancestor.style.zIndex = layer;
      ancestor = ancestor.parentElement;
    }
    node.setAttribute("data-card-dragging", "");
  };

  const onDrag = (_event: DraggableEvent, data: DraggableData) => {
    const { left, top, width, height } = frame.current;
    place(
      clamp(
        offset.current.x + data.deltaX,
        visibleEdge - width - left,
        window.innerWidth - left - visibleEdge,
      ),
      clamp(
        offset.current.y + data.deltaY,
        visibleEdge - height - top,
        window.innerHeight - top - visibleEdge,
      ),
    );
  };

  const onStop = () => {
    nodeRef.current?.removeAttribute("data-card-dragging");
  };

  return { nodeRef, onStart, onDrag, onStop };
}
