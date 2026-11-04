import { createContext } from "react";
import type { BlinkieEditor } from "../render/blinkie/blinkie.types.ts";

export const BlinkieDraftContext = createContext<BlinkieEditor | null>(null);
