import React from "react";
import useReveal from "../hooks/useReveal";
import { Mail, Heart, ArrowUp, Code2 } from "lucide-react";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const reveal = useReveal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: FiGithub,
      url: "https://github.com/yourusername",
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      url: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400",
    },

    {
      name: "X",
      icon: FaXTwitter,
      url: "https://x.com",
      color: "hover:text-sky-400",
    },
  ];

  const quickLinks = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const techStack = [
    { name: "React 19", icon: "⚛️" },
    { name: "TypeScript", icon: "📘" },
    { name: "Tailwind v4", icon: "🎨" },
    { name: "Vite 7", icon: "⚡" },
  ];

  return (
    <footer
      ref={reveal}
      className="relative w-full bg-gradient-to-b from-gray-950 to-black border-t border-white/10 py-12 px-6 mt-auto overflow-hidden transition-all duration-700 opacity-0 translate-y-6"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Fitwi.G
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building modern, scalable, and performant web applications with
              cutting-edge technologies.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-2 rounded-lg bg-white/5 border border-white/10
                      text-gray-400 transition-all duration-300
                      hover:scale-110 hover:bg-white/10 ${social.color}
                    `}
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-4 transition-all duration-300">
                      →
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm"
                >
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Contact & Availability */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Open for Work
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-gray-400">
                  Available for opportunities
                </span>
              </div>
              <p className="text-gray-400 text-sm">📍 Netherlands</p>
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-400 text-sm hover:scale-105 transition-all duration-300"
              >
                <Mail size={14} />
                <span>Get in touch</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-gray-500 text-xs">
              © {currentYear} Fitwi Gebray — All rights reserved.
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-1 text-xs text-gray-500 group">
              Designed & Built with
              <Heart size={12} className="text-red-500 animate-pulse mx-1" />
              by
              <span className="text-gray-400 font-medium group-hover:text-cyan-400 transition-colors">
                Fitwi.G
              </span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              <ArrowUp size={14} />
              Back to Top
            </button>
          </div>
        </div>

        {/* Subtle gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
