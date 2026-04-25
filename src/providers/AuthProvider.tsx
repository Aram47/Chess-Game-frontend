import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  loginProvider,
  logoutProvider,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = !!user;

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const result = await refreshProvider();
        if (result.user) setUser(result.user);
      } catch {
        // silently ignore — no session yet
      }
    };
    restoreUser();
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
      console.log("Full API Response:", result);

      const userData = result.user || result;

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
  }, []);

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
