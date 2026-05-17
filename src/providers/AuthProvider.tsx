import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  loginProvider,
  logoutProvider,
  registerProvider,
  resetPasswordProvider,
} from "../api/auth";
import { restoreSession } from "../lib/auth/restoreSession";
import { normalizeUserFromApi } from "../lib/auth/mapUser";
import type {
  ILoginPayload,
  IRegisterPayload,
  IResetPassword,
  UserProfile,
} from "../types/authType";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const isLoggedIn = !!user;

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const restored = await restoreSession();
        if (!cancelled && restored) {
          setUser(restored);
        }
      } finally {
        if (!cancelled) {
          setIsAuthReady(true);
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      setError(null);
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  const login = useCallback(async ({ login, password }: ILoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginProvider({ login, password });
      const userData = normalizeUserFromApi(result);
      if (!userData) {
        setError("Login failed");
        return false;
      }

      setUser(userData);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: IRegisterPayload) => {
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
  }, [loading]);

  const resetPassword = useCallback(
    async (data: IResetPassword): Promise<boolean> => {
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
    [],
  );

  const logout = useCallback(async () => {
    try {
      await logoutProvider();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setError(null);
      window.location.href = "/";
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        isAuthReady,
        loading,
        error,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
