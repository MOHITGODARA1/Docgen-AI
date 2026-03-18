import React from "react";

import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #27272a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Badge */}
      <div className="relative inline-flex items-center gap-2 border border-zinc-800 rounded-full px-4 py-1.5 mb-10 text-xs font-medium text-zinc-500 tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
        AI-Powered · Free to Try · No Signup Required
      </div>

      {/* Heading */}
      <h1 className="relative text-5xl md:text-6xl font-semibold text-zinc-100 leading-[1.08] tracking-tighter max-w-[950px] mb-6">
        Understand Any Codebase{" "}
        <span className="text-blue-500">in Seconds</span>
      </h1>

      {/* Subtext */}
      <p className="relative text-zinc-500 text-lg leading-relaxed max-w-2xl mb-14">
        DocGen AI analyzes GitHub repositories and generates complete
        documentation, architecture breakdowns, and code summaries automatically.
      </p>

      {/* Input */}
      <form 
        onSubmit={(e) => { e.preventDefault(); navigate("/login"); }}
        className="relative flex w-full max-w-[590px] border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 focus-within:border-blue-500 transition-colors duration-200"
      >
        <input
          className="flex-1 bg-transparent outline-none text-zinc-300 placeholder-zinc-600 text-sm px-5 py-4"
          placeholder="github.com/username/repository"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 transition-colors duration-150 whitespace-nowrap">
          Analyze
        </button>
      </form>

      <p className="relative mt-5 text-xs text-zinc-700">
        Works with any public GitHub repository
      </p>
    </section>
  );
};

export default Hero;