import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Inverse of ProtectedRoute: for routes that should only be reachable
 * while logged OUT (e.g. /login). If the user is already authenticated,
 * bounce them to the home page instead of showing the login form again.
 */
function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicOnlyRoute;