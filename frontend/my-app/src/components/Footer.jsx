import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#1f2937] bg-[#020617] py-12 px-6 mt-auto">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* LEFT: Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-linear-to-r from-[#3b82f6] to-[#a855f7]" />
            <span className="text-[#e5e7eb] font-bold tracking-tight text-lg">
              Fitwi.G
            </span>
          </div>
          <p className="text-[#9ca3af] text-sm">
            © {currentYear} — All rights reserved.
          </p>
        </div>

        {/* MIDDLE: Tech Stack Badges */}
        <div className="flex items-center gap-3 text-[0.7rem] text-[#9ca3af] font-medium uppercase tracking-widest">
          <span>React 19</span>
          <span className="text-[#1f2937]">•</span>
          <span>Tailwind v4</span>
          <span className="text-[#1f2937]">•</span>
          <span>Vite 7</span>
        </div>

        {/* RIGHT: Design Credit */}
        <div className="text-[#9ca3af] text-sm flex items-center gap-1 group">
          Designed & Built with
          <span className="text-red-500 animate-pulse">❤️</span>
          by
          <span className="text-[#e5e7eb] font-medium group-hover:text-[#3b82f6] transition-colors cursor-default">
            Me
          </span>
        </div>
      </div>

      {/* Optional: Very subtle bottom line for extra "finish" */}
      <div className="max-w-[400px] h-[1px] mx-auto mt-10 bg-linear-to-r from-transparent via-[#1f2937] to-transparent opacity-50" />
    </footer>
  );
};

export default Footer;
