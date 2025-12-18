import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context";
import { ROUTE_PATHS } from "../../../app/routes/routePaths";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login({ email, password });
      nav(ROUTE_PATHS.home, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <h1 className="text-xl font-semibold text-slate-900">Login</h1>
        <p className="mt-1 text-sm text-slate-600">
          Auth menggunakan HttpOnly Cookies.
        </p>

        <div className="mt-6">
          <LoginForm
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={onSubmit}
            error={error}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
