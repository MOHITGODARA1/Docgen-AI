import React from "react";

const links = {
  Product: ["Features", "Docs", "Pricing", "Changelog"],
  Resources: ["Blog", "Support", "Community", "Status"],
  Social: ["GitHub", "Twitter", "Discord", "LinkedIn"],
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-zinc-900 text-xs font-bold flex-shrink-0">
                D
              </div>
              <span className="text-white font-semibold text-[15px] tracking-tight">
                DocGen <span className="text-zinc-500 font-normal">AI</span>
              </span>
            </div>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-[200px]">
              AI-powered GitHub repository analyzer and documentation generator for developers.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-[10px] font-semibold tracking-[2px] uppercase text-zinc-600 mb-5">
                {category}
              </p>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-150 no-underline"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 pt-7 flex flex-wrap items-center justify-between gap-4">
          <span className="text-zinc-700 text-xs">
            © {new Date().getFullYear()} DocGen AI. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors duration-150 no-underline"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;