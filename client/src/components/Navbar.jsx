import React from "react";
import { Link, useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { FaPencilAlt } from "react-icons/fa";

const Navbar = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="flex justify-between items-center h-12 bg-[#0b0a09] border-b border-stone-900/30 px-6">
        <div className="flex items-center space-x-2">
          <FaPencilAlt className="text-stone-500 text-xs" />
          <span className="text-xs font-semibold text-stone-400 font-editorial-heading">Companion</span>
        </div>
        <div className="animate-spin rounded-full h-3.5 w-3.5 border-t-2 border-b-2 border-stone-600"></div>
      </div>
    );
  }

  return (
    <nav className="bg-[#0b0a09]/80 border-b border-stone-900/40 text-stone-200 py-3.5 px-6 md:px-8 sticky top-0 z-50 backdrop-blur-md transition-all duration-200">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <Link
            to="/"
            className="flex items-center space-x-2 text-[15px] font-semibold tracking-tight text-stone-100 font-editorial-heading hover:opacity-90 transition-opacity"
          >
            <FaPencilAlt className="text-amber-600/70 text-xs" />
            <span>Companion</span>
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>
              Story
            </NavLink>
            {authenticated && (
              <NavLink to="/write" active={location.pathname === "/write"}>
                Workspace
              </NavLink>
            )}
          </div>
        </div>
        <div>
          {authenticated ? (
            <button
              onClick={logout}
              className="bg-transparent border border-stone-800 hover:bg-stone-900/40 hover:border-stone-700 text-stone-300 hover:text-white px-3 py-1.5 rounded text-[11px] font-medium transition duration-150 cursor-pointer"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={login}
              className="bg-stone-100 hover:bg-white text-stone-950 px-3 py-1.5 rounded text-[11px] font-medium transition duration-150 cursor-pointer"
            >
              Access Companion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`text-xs tracking-wide transition duration-150 font-medium ${
      active
        ? "text-stone-100 border-b border-amber-600/50 pb-0.5"
        : "text-stone-400 hover:text-stone-100"
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
