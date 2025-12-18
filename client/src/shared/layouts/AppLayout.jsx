import { Outlet } from "react-router";
import { useAuth } from "../../features/auth/context";
import Button from "../ui/Button";

export default function AppLayout() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center">
          <div className="font-semibold text-slate-900">Warehouse App</div>
          <Button onClick={logout} className="ml-auto">
            Logout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
