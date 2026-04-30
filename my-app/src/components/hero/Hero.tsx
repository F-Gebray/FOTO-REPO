import React from "react";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { heroData } from "../../data/heroData";
import { scrollToSection } from "../../utils/scrollToSection";
import Button from "../ui/Button";
import Pill from "../ui/Pill";
import useReveal from "../../hooks/useReveal";
import { Sparkles, Code2, Briefcase, MapPin } from "lucide-react";

const Hero: React.FC = () => {
  const {
    availabilityText,
    heading,
    subtitle,
    meta,
    coreStack,
    stats,
  } = heroData;

  const reveal = useReveal();

  const socialLinks = [
    {
      icon: FiGithub,
      url: "https://github.com/F-Gebray/FOTO-REPO",
      label: "GitHub",
    },
    {
      icon: FiLinkedin,
      url: "https://linkedin.com",
      label: "LinkedIn",
    },
    { icon: FaXTwitter, url: "https://x.com", label: "X" },
    { icon: FiMail, url: "mailto:your.email@example.com", label: "Email" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1200px] w-full mx-auto px-6 py-20">
        <div
          ref={reveal}
          className="transition-all duration-700 opacity-0 translate-y-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* LEFT SIDE */}
          <div className="flex flex-col items-start space-y-8">
            {/* Availability Badge */}
            <Pill>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-green-400 font-medium">
                  {availabilityText}
                </span>
              </div>
            </Pill>

            {/* Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.2]">
                <span className="text-white">I build</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  clean, modern web interfaces
                </span>
                <br />
                <span className="text-white">with React.</span>
              </h1>

              {/* Animated underline */}
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
              {subtitle}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 pt-2">
              {meta.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => scrollToSection("projects")}>
                View Projects <FiArrowRight size={16} />
              </Button>
              <Button
                variant="secondary"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE - Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-t-2xl" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Code2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Portfolio Overview</h3>
                    <p className="text-gray-500 text-xs">Frontend Developer</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      Core Stack
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coreStack.map((tech) => (
                      <a
                        key={tech.name}
                        href={tech.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
                      >
                        {tech.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-400">
                        Open for opportunities
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                      <span className="text-xs text-green-400">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <MapPin size={12} className="text-gray-500" />
                    <span className="text-xs text-gray-500">Netherlands</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div
            className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => scrollToSection("projects")}
          >
            <span className="text-xs text-gray-500">Scroll to explore</span>
            <div className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
