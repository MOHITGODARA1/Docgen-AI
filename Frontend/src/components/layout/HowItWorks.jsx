import React from "react";

const steps = [
  {
    num: "01",
    title: "Paste Repository URL",
    desc: "Drop any public GitHub repository URL into the input field. No authentication or setup needed.",
  },
  {
    num: "02",
    title: "AI Scans the Codebase",
    desc: "DocGen AI reads every file, maps dependencies, and builds a deep semantic understanding of your project.",
  },
  {
    num: "03",
    title: "Documentation Ready",
    desc: "Receive complete documentation, an architecture overview, and a plain-English summary — instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-zinc-900/30 border-t border-zinc-800 py-24 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-blue-500 text-[11px] font-semibold tracking-[2.5px] uppercase mb-4">
          How It Works
        </p>
        <h2 className="text-zinc-100 text-4xl md:text-5xl font-bold tracking-tighter">
          Three steps to complete clarity
        </h2>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 border border-zinc-800 rounded-2xl overflow-hidden">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`p-10 hover:bg-zinc-900/60 transition-colors duration-200 cursor-default
              ${i < steps.length - 1 ? "border-b md:border-b-0 md:border-r border-zinc-800" : ""}
            `}
          >
            <span className="text-5xl font-bold text-zinc-800 tracking-tighter leading-none block mb-8">
              {step.num}
            </span>
            <div className="w-7 h-0.5 bg-blue-500 mb-5" />
            <h3 className="text-zinc-200 text-base font-semibold mb-3 tracking-tight">
              {step.title}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;