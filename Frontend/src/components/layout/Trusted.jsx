import React from "react";

const brands = ["Google", "Microsoft", "Amazon", "Stripe", "Vercel", "GitHub"];

const Trusted = () => {
  return (
    <section className="bg-zinc-950 border-t border-b border-zinc-800/60 py-14 px-6">
      <p className="text-center text-[10px] font-semibold tracking-[2.5px] uppercase text-zinc-700 mb-8">
        Trusted by engineers at
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-4">
        {brands.map((brand) => (
          <span
            key={brand}
            className="text-zinc-700 hover:text-zinc-400 font-semibold text-sm tracking-wide transition-colors duration-200 cursor-default select-none"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Trusted;