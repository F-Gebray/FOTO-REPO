import React from "react";

interface StatProps {
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ value, label }) => {
  return (
    <div className="flex-1 min-w-[6rem]">
      <div className="text-[1.05rem] font-semibold text-slate-200 tracking-tight">
        {value}
      </div>
      <div className="text-[0.75rem] text-slate-400 mt-0.5 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
};

export default Stat;
