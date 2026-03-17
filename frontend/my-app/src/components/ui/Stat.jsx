import React from "react";

const Stat = ({ value, label }) => {
  return (
    // hero-stat -> flex-1 ensures equal spacing in the grid
    <div className="flex-1 min-w-[6rem]">
      {/* hero-stat-value -> bold, large, and light-colored */}
      <div className="text-[1.05rem] font-semibold text-slate-200 tracking-tight">
        {value}
      </div>

      {/* hero-stat-label -> smaller and muted text */}
      <div className="text-[0.75rem] text-slate-400 mt-0.5 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
};

export default Stat;
