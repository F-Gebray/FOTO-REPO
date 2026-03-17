function Logo() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="w-12 h-12" // Tailwind for size
    >
      {/* Tailwind for background color */}
      <rect width="120" height="120" rx="24" className="fill-slate-900" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="48"
        className="fill-white font-bold" // Tailwind for text
      >
        FG
      </text>
    </svg>
  );
}
export default Logo;
