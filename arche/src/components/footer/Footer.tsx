import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="h-px bg-white/[0.08] mx-10" />
      <footer className="flex justify-between items-center px-10 py-8">
        <p className="text-[9px] tracking-[1.5px] uppercase text-white/20">
          © 2025 Archē Stays. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <span
              key={link}
              className="text-[9px] tracking-[1.5px] uppercase text-white/25 cursor-pointer hover:text-[#c9a96e] transition-colors duration-300"
            >
              {link}
            </span>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
