import { Navigate, Route, Routes } from "react-router";
import { ROUTE_PATHS } from "./paths";

import RequireAuth from "../features/auth/components/RequireAuth";
import LoginPage from "../features/auth/LoginPage";
import AppLayout from "../components/layouts/AppLayout";

function Placeholder({ title }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">Next: implement fitur ini.</p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.login} element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route
            path={ROUTE_PATHS.home}
            element={<Navigate to={ROUTE_PATHS.warehouses} replace />}
          />
          <Route
            path={ROUTE_PATHS.warehouses}
            element={<Placeholder title="Warehouses" />}
          />
          <Route
            path={ROUTE_PATHS.items}
            element={<Placeholder title="Items" />}
          />
          <Route
            path={ROUTE_PATHS.purchaseOrders}
            element={<Placeholder title="Purchase Orders" />}
          />
          <Route
            path={ROUTE_PATHS.deliveryOrders}
            element={<Placeholder title="Delivery Orders" />}
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTE_PATHS.home} replace />} />
    </Routes>
  );
}
