export type DingbatName =
  | "star"
  | "arrow"
  | "check"
  | "cross"
  | "diamond"
  | "flower"
  | "note"
  | "mail"
  | "scissors"
  | "heart";

export type DingbatProps = {
  name: DingbatName;
  /** When given, the glyph becomes meaningful and this text is read instead. */
  label?: string;
  className?: string;
};
