import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface AuthBootstrapProps {
  children: ReactNode;
}

/**
 * Delays app routes until the initial refresh/profile restore finishes,
 * so protected API calls do not race ahead and trigger a false logout.
 */
export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const { isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#1c1c1c] text-[#E5CC7A]"
        role="status"
        aria-live="polite"
        aria-label="Restoring session"
      >
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
