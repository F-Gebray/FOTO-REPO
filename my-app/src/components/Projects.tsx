import React, { useState } from "react";
import projects from "../data/projects";
import {
  ExternalLink,
  Layers,
  Globe,
  Smartphone,
  Cpu,
  Sparkles,
  ArrowRight,
  Star,
  Code2,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";

const getIcon = (id: number): React.ReactElement => {
  switch (id) {
    case 1:
      return <Layers size={24} className="text-cyan-400" />;
    case 2:
      return <Globe size={24} className="text-blue-500" />;
    case 3:
      return <Smartphone size={24} className="text-purple-500" />;
    case 4:
      return <Cpu size={24} className="text-cyan-400" />;
    default:
      return <Layers size={24} className="text-cyan-400" />;
  }
};

const Projects: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        {/* HEADER - Centered */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">
              Portfolio Showcase
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Projects
            </span>
          </h2>

          {/* Centered Subtitle */}
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Building scalable, performant, and user-centric web applications
            with modern technologies.
          </p>

          {/* Animated underline */}
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mt-6" />
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 pb-8 border-b border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {projects.length}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Projects Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Live Deployment
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Modern</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Tech Stack
            </div>
          </div>
        </div>

        {/* PROJECTS GRID - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Glow effect behind card */}
              {hoveredId === project.id && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-30 transition-opacity duration-500" />
              )}

              {/* Main Card */}
              <div
                className="
                relative bg-gradient-to-br from-gray-900 to-gray-800 
                rounded-2xl overflow-hidden
                border border-white/10
                transition-all duration-500
                hover:border-cyan-500/30
              "
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
                </div>

                {/* Card Content */}
                <div className="relative p-8 flex flex-col h-full">
                  {/* Top Row */}
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon with animation */}
                    <div
                      className="
                      p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5
                      transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-3
                      group-hover:shadow-lg group-hover:shadow-cyan-500/20
                    "
                    >
                      {getIcon(project.id)}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.githubUrl, "_blank");
                        }}
                        className="
                          p-2 rounded-lg bg-white/5 text-gray-400
                          transition-all duration-300
                          hover:bg-white/10 hover:text-white hover:scale-110
                          group/btn
                        "
                        title="View Source Code"
                      >
                        <Code2
                          size={16}
                          className="group-hover/btn:rotate-3 transition-transform"
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.liveUrl, "_blank");
                        }}
                        className="
                          p-2 rounded-lg bg-white/5 text-gray-400
                          transition-all duration-300
                          hover:bg-cyan-500/20 hover:text-cyan-400 hover:scale-110
                        "
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="
                            text-[11px] font-mono px-2.5 py-1 rounded-md
                            bg-gradient-to-r from-white/5 to-white/5
                            text-gray-400 border border-white/10
                            transition-all duration-300
                            group-hover:border-cyan-500/30 group-hover:text-cyan-400
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.tech.length > 5 && (
                      <p className="text-[11px] text-gray-500 mt-2">
                        +{project.tech.length - 5} more technologies
                      </p>
                    )}
                  </div>

                  {/* Learn More Button */}
                  <button
                    onClick={() => window.open(project.liveUrl, "_blank")}
                    className="
                      mt-2 inline-flex items-center gap-2 text-sm font-medium
                      text-cyan-400 hover:text-cyan-300
                      transition-all duration-300
                      group/btn w-fit
                    "
                  >
                    <span>View Project</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="text-center mt-20 pt-8 border-t border-white/10">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://github.com/F-Gebray/FOTO-REPO"
              target="_blank"
              rel="noreferrer"
              className="
                group inline-flex items-center gap-2 px-6 py-3 rounded-xl
                bg-gradient-to-r from-cyan-500/10 to-purple-500/10
                border border-cyan-500/30
                text-gray-300 font-medium
                transition-all duration-300
                hover:scale-105 hover:border-cyan-500/60 hover:text-white
              "
            >
              <FiGithub size={18} />
              <span>View All Projects on GitHub</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            All projects are fully responsive, deployed, and built with
            production-ready code
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
