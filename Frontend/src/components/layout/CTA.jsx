import React from "react";

const CTA = () => {
  return (
    <section className="bg-zinc-950 py-20 px-6">
      <div className="max-w-2xl mx-auto border border-zinc-800 rounded-2xl bg-zinc-900/40 px-8 md:px-20 py-16 text-center">
        {/* Tag */}
        <span className="inline-block border border-zinc-700 rounded text-blue-500 text-[10px] font-semibold tracking-[2px] uppercase px-3 py-1 mb-8">
          Get Started
        </span>

        {/* Heading */}
        <h2 className="text-zinc-100 text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-5">
          Start using DocGen AI<br />today — it's free
        </h2>

        {/* Subtext */}
        <p className="text-zinc-500 text-base leading-relaxed max-w-sm mx-auto mb-10">
          Analyze any repository and generate complete documentation in seconds.
          No credit card. No account required.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3.5 rounded-lg transition-colors duration-150">
            Try It Free
          </button>
          <button className="bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 text-sm font-medium px-8 py-3.5 rounded-lg transition-colors duration-150">
            Read the Docs
          </button>
        </div>

        <p className="mt-6 text-xs text-zinc-700">
          Works with any public GitHub repository
        </p>
      </div>
    </section>
  );
};

export default CTA;