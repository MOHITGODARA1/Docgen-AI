import React, { useState, useEffect } from "react";
import Login from "./login";

const NAV_LINKS = ["Features", "Docs", "Pricing", "GitHub"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
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

          {/* CTA — opens Login modal */}
          <button
            onClick={() => setLoginOpen(true)}
            className="bg-white text-zinc-900 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-zinc-200 transition-colors duration-150"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Login modal — rendered outside the nav so it covers the whole page */}
      <Login isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;