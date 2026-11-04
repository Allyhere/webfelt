import type { ReactNode } from "react";
import type { DingbatName } from "../Dingbat/Dingbat.types.ts";

export type WindowProps = {
  title: string;
  ornament?: DingbatName;
  className?: string;
  children: ReactNode;
};
