import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignInAlt, FaRocket, FaPencilAlt } from "react-icons/fa";

function LoginPage() {
  const { login, ready, authenticated } = usePrivy();
  const navigate = useNavigate();
  const location = useLocation();

  // Where the user was trying to go before being redirected to /login.
  // Falls back to /write if they came here directly.
  const from = location.state?.from?.pathname || "/write";

  useEffect(() => {
    if (ready && authenticated) {
      // User is already logged in — send them to their intended destination.
      navigate(from, { replace: true });
    }
  }, [ready, authenticated, navigate, from]);

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0b0a09]">
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-stone-600"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-60px)] bg-[#0b0a09] px-4 selection:bg-amber-600/10">
      <div className="border border-stone-900 bg-[#12100f] p-8 md:p-10 rounded-lg max-w-sm w-full text-center shadow-2xl space-y-6">

        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded bg-stone-900 border border-stone-850 flex items-center justify-center text-amber-600/70 shadow-inner">
            <FaPencilAlt className="text-sm" />
          </div>
          <h1 className="text-xl font-editorial-heading font-medium text-stone-100">
            Welcome to Companion
          </h1>
          <p className="text-stone-450 text-[11px] font-light max-w-[240px] mx-auto">
            A thoughtful, distraction-free environment for refining your prose.
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={login}
            className="w-full bg-stone-100 hover:bg-white text-stone-950 py-2 px-4 rounded font-medium text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <FaSignInAlt className="text-[10px]" />
            Login
          </button>

          <button
            onClick={login}
            className="w-full bg-[#161413] border border-stone-850 hover:bg-[#1d1b1a] hover:border-stone-750 text-stone-200 py-2 px-4 rounded font-medium text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaRocket className="text-[10px] text-amber-600/70" />
            Get Started
          </button>
        </div>

        <p className="text-[10px] text-stone-500 leading-relaxed max-w-[240px] mx-auto font-light">
          Verify your account to access the custom workspace, draft composition tools, and rephrasing models.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
