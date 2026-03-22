import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";

import {
  loginProvider,
  refreshProvider,
  registerProvider,
  resetPasswordProvider,
} from "../api/auth";
import type {
  ILoginPayload,
  IRegisterPayload,
  IResetPassword,
  UserProfile,
} from "../types/authType";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("accessToken");
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const restoreUser = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return logout();

      try {
        const result = await refreshProvider(refreshToken);
        localStorage.setItem("accessToken", result.accessToken);
        if (result.user) setUser(result.user);
        setIsLoggedIn(true);
      } catch {
        logout();
      }
    };

    restoreUser();
  }, []);

  const login = useCallback(
    async ({ login, password }: ILoginPayload) => {
      if (loading) return false;
      setLoading(true);
      setError(null);
      try {
        const result = await loginProvider({ login, password });

        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        setUser(result.user);
        setIsLoggedIn(true);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  const register = useCallback(
    async (data: IRegisterPayload) => {
      if (loading) return false;
      setLoading(true);
      setError(null);
      try {
        await registerProvider(data);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return false;
    }

    try {
      const result = await refreshProvider(refreshToken);
      localStorage.setItem("accessToken", result.accessToken);
      if (result.user) setUser(result.user);
      return true;
    } catch {
      logout();
      return false;
    }
  }, [logout]);

  const resetPassword = useCallback(
    async (data: IResetPassword): Promise<boolean> => {
      if (loading) return false;
      setLoading(true);
      setError(null);
      try {
        await resetPasswordProvider(data);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Reset failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        error,
        login,
        register,
        logout,
        refreshAccessToken,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
