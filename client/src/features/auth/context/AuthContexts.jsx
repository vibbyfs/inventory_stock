import React, { useEffect, useMemo, useState } from "react";
import { loginApi, logoutApi, refreshApi } from "../api/authApi";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("checking");
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await refreshApi();
        if (!mounted) return;
        setStatus("authed");
      } catch {
        if (!mounted) return;
        setStatus("guest");
        setUser(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async ({ email, password }) => {
    const data = await loginApi({ email, password });
    setUser(data?.user ?? null);
    setStatus("authed");
    return data;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
      setStatus("guest");
    }
  };

  const value = useMemo(
    () => ({ status, user, isAuthed: status === "authed", login, logout }),
    [status, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
