import type { ReactNode } from "react";
import type { DingbatName } from "../Dingbat/Dingbat.types.ts";

export type CardProps = {
  title: string;
  bullet?: DingbatName;
  className?: string;
  children: ReactNode;
};
