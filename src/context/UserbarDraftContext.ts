import { createContext } from "react";
import type { UserbarEditor } from "../types.ts";

export const UserbarDraftContext = createContext<UserbarEditor | null>(null);
