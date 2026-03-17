const Button = ({ variant = "primary", children, onClick }) => {
  const baseClasses =
    "rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 cursor-pointer transition-all duration-200 active:scale-95";

  const variants = {
    // Matches your .btn-primary gradient and shadow
    primary:
      "bg-gradient-to-br from-[#3b82f6] to-[#a855f7] text-[#eff6ff] shadow-[0_20px_40px_rgba(37,99,235,0.5)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.7)] hover:-translate-y-0.5",

    // Matches your .btn-secondary radial gradient and border
    secondary:
      "border border-[#374151] bg-[radial-gradient(circle_at_top_left,#020617,#020617)] text-[#9ca3af] hover:border-[#4b5563] hover:text-[#e5e7eb]",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
