import React from "react";
import { FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="mt-16 py-10 bg-white/5 backdrop-blur-lg text-white relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-sky-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        {/* Logo / Text */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-sky-400 flex items-center justify-center">
            <FiGlobe className="text-white text-lg" />
          </div>
          <span className="font-extrabold text-white text-lg">TravelNow</span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all"
          >
            <FiLinkedin size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-zinc-400 text-sm md:text-base text-center md:text-right">
          © {new Date().getFullYear()} TravelNow — Built by Fitwi
        </p>
      </div>
    </footer>
  );
}
