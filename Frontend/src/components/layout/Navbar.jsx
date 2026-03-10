import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = ["Features", "Docs", "Pricing", "GitHub"];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-zinc-900 text-xs font-bold">
              D
            </div>
            <span className="text-white font-semibold text-[15px] tracking-tight">
              DocGen{" "}
              <span className="text-zinc-500 font-normal">AI</span>
            </span>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-150 no-underline"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Auth State */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white text-sm font-medium">{user.name}</span>
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <button
                onClick={logout}
                className="text-zinc-400 hover:text-white text-sm font-medium transition-colors ml-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-zinc-900 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-zinc-200 transition-colors duration-150"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;