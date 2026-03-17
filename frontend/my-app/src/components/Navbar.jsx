import React from "react";
import { FiMail } from "react-icons/fi";

const Navbar = () => {
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1f2937]/50 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO SECTION */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection("home")}
          role="button"
          tabIndex="0"
          aria-label="Scroll to home"
          onKeyDown={(e) => e.key === "Enter" && scrollToSection("home")}
        >
          {/* Your original logo circle style */}
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#60a5fa] via-[#2563eb] to-[#1e40af] shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-transform group-hover:scale-110" />

          <div className="flex flex-col">
            <span className="text-[#e5e7eb] font-bold text-sm leading-none">
              Fitwi.G
            </span>
            <span className="text-[#9ca3af] text-[10px] uppercase tracking-tighter">
              Frontend Developer
            </span>
          </div>
        </div>

        {/* NAV LINKS (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="text-[#9ca3af] text-sm font-medium transition-all hover:text-[#e5e7eb] relative group cursor-pointer"
              onClick={() => scrollToSection(link.id)}
            >
              {link.name}
              {/* Animated underline effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-r from-[#3b82f6] to-[#a855f7] transition-all group-hover:w-full rounded-full" />
            </button>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#374151] bg-[#020617] text-[#e5e7eb] text-xs font-semibold transition-all hover:bg-[#1f2937] hover:border-[#4b5563] active:scale-95 shadow-sm"
          onClick={() => scrollToSection("contact")}
        >
          <FiMail size={14} className="text-[#3b82f6]" />
          <span>Contact</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
