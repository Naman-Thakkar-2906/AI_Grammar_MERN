import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { FaPencilAlt } from "react-icons/fa";

/**
 * ProtectedRoute — wraps any route that requires authentication.
 *
 * Behaviour:
 *  - While Privy is still initialising (`!ready`): renders a full-screen
 *    loading spinner so no protected content ever flashes.
 *  - Once ready and NOT authenticated: redirects to /login, preserving the
 *    attempted destination in `state.from` so LoginPage can redirect back.
 *  - Once ready and authenticated: renders children normally.
 */
const ProtectedRoute = ({ children }) => {
  const { ready, authenticated } = usePrivy();
  const location = useLocation();

  // Auth state is still being resolved — show a neutral loading screen.
  // This prevents any flash of protected content before the check completes.
  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] bg-[#0b0a09] gap-4">
        <div className="w-10 h-10 rounded bg-stone-900 border border-stone-850 flex items-center justify-center text-amber-600/60 shadow-inner">
          <FaPencilAlt className="text-sm" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="animate-spin rounded-full h-3.5 w-3.5 border-t-2 border-b-2 border-stone-600"></div>
          <span className="text-stone-500 text-[11px] font-light">
            Verifying access…
          </span>
        </div>
      </div>
    );
  }

  // Auth resolved — user is NOT authenticated.
  // Redirect to /login and record where they were trying to go.
  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Auth resolved — user IS authenticated. Render the protected content.
  return children;
};

export default ProtectedRoute;
