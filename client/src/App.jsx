import { BrowserRouter } from "react-router";
import AppProviders from "./app/providers/AppProviders";
import AppRoutes from "./app/routes/AppRoutes";

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}
