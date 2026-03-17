import React from "react";

const Pill = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 text-[0.75rem] font-medium rounded-full border border-slate-800 bg-slate-900/90 text-slate-400 shadow-sm transition-colors hover:border-slate-700">
      {children}
    </span>
  );
};

export default Pill;
