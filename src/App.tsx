import { UserbarDraftProvider } from "./context/UserbarDraftProvider/UserbarDraftProvider.tsx";
import { UserbarPage } from "./features/userbar/UserbarPage.tsx";

export default function App() {
  return (
    <UserbarDraftProvider>
      <UserbarPage />
    </UserbarDraftProvider>
  );
}
