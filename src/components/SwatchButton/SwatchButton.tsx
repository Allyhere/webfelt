import type { ReactNode, RefObject } from "react";

type SwatchButtonProps = {
  pressed: boolean;
  onPress: () => void;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  children: ReactNode;
};

export function SwatchButton({
  pressed,
  onPress,
  canvasRef,
  children,
}: SwatchButtonProps) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={pressed}
        onClick={onPress}
        className="grid justify-items-center gap-tight border bg-transparent p-tight text-inherit aria-pressed:outline-2 aria-pressed:outline-solid aria-pressed:outline-current aria-pressed:outline-offset-2"
      >
        <canvas
          ref={canvasRef}
          className="pixelated size-swatch"
          aria-hidden="true"
        />
        {children}
      </button>
    </li>
  );
}
