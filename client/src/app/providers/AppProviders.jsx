import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../query/queryClient";
import { AuthProvider } from "../../features/auth/context";

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
