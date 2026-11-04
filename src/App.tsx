import { useState } from "react";
import { BlinkieDraftProvider } from "./context/BlinkieDraftProvider/BlinkieDraftProvider.tsx";
import { UserbarDraftProvider } from "./context/UserbarDraftProvider/UserbarDraftProvider.tsx";
import { BlinkiePage } from "./features/blinkie/BlinkiePage.tsx";
import { UserbarPage } from "./features/userbar/UserbarPage.tsx";

type Page = "userbar" | "blinkie";

export default function App() {
  const [page, setPage] = useState<Page>("userbar");
  if (page === "blinkie") {
    return (
      <BlinkieDraftProvider>
        <BlinkiePage onShowUserbars={() => setPage("userbar")} />
      </BlinkieDraftProvider>
    );
  }
  return (
    <UserbarDraftProvider>
      <UserbarPage onShowBlinkies={() => setPage("blinkie")} />
    </UserbarDraftProvider>
  );
}
