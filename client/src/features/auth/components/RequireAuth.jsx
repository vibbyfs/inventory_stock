import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../../context/useAuth";
import { ROUTE_PATHS } from "../../../routes/paths";

export default function RequireAuth() {
  const { status } = useAuth();

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Checking session...
      </div>
    );
  }

  if (status !== "authed") return <Navigate to={ROUTE_PATHS.login} replace />;
  return <Outlet />;
}
