import type { DingbatName, DingbatProps } from "./Dingbat.types.ts";

function glyph(name: DingbatName): string {
  switch (name) {
    case "star":
      return "\u2726";
    case "arrow":
      return "\u279C";
    case "check":
      return "\u2714";
    case "cross":
      return "\u2716";
    case "diamond":
      return "\u2756";
    case "flower":
      return "\u273F";
    case "note":
      return "\u266B";
    case "mail":
      return "\u2709";
    case "scissors":
      return "\u2702";
    case "heart":
      return "\u2764";
  }
}

export function Dingbat({ name, label, className = "" }: DingbatProps) {
  return (
    <span className={`font-dings inline-block leading-none ${className}`}>
      <span aria-hidden="true">{glyph(name)}</span>
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
