import React from "react";

const Logo: React.FC = () => {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="w-12 h-12">
      <rect width="120" height="120" rx="24" className="fill-slate-900" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="48"
        className="fill-white font-bold"
      >
        FG
      </text>
    </svg>
  );
};

export default Logo;
