import React from "react";

const features = [
  {
    num: "01",
    title: "AI Code Summary",
    desc: "Instantly understand any repository with concise, accurate summaries of purpose, structure, and logic.",
  },
  {
    num: "02",
    title: "Architecture Breakdown",
    desc: "Visualize project structure, module relationships, and data flow without reading a single file manually.",
  },
  {
    num: "03",
    title: "Auto Documentation",
    desc: "Generate clean, readable documentation directly from source code — no manual writing required.",
  },
  {
    num: "04",
    title: "Tech Stack Detection",
    desc: "Automatically identify every language, framework, and library present across the entire codebase.",
  },
  {
    num: "05",
    title: "Code Quality Insights",
    desc: "Surface complexity hotspots, risky patterns, and concrete improvement suggestions.",
  },
  {
    num: "06",
    title: "Repository Chat",
    desc: "Ask natural language questions about any part of the code and receive precise, contextual answers.",
  },
];

const Features = () => {
  return (
    <section className="bg-zinc-950 py-24 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-blue-500 text-[11px] font-semibold tracking-[2.5px] uppercase mb-4">
          Features
        </p>
        <h2 className="text-zinc-100 text-4xl md:text-5xl font-bold tracking-tighter">
          Everything you need to understand code
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-zinc-800 rounded-2xl overflow-hidden divide-x-0 md:divide-x divide-zinc-800">
        {features.map((f, i) => (
          <div
            key={i}
            className={`p-8 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors duration-200 cursor-default
              ${i >= features.length - (features.length % 3 === 0 ? 3 : features.length % 3) ? "lg:border-b-0" : ""}
              ${i >= features.length - 2 ? "md:border-b-0 lg:border-b" : ""}
              ${i === features.length - 1 ? "border-b-0 md:border-b-0 lg:border-b-0" : ""}
            `}
          >
            <p className="text-zinc-700 text-[11px] font-semibold tracking-widest uppercase mb-5">
              {f.num}
            </p>
            <h3 className="text-zinc-200 text-[15px] font-semibold mb-3 tracking-tight">
              {f.title}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;