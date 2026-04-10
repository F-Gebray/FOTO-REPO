import React from "react";
import projects from "../data/projects";
import { ExternalLink, Layers, Globe, Smartphone, Cpu } from "lucide-react";
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
  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-16 md:py-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem] rounded-full border border-white/10 bg-white/5 text-[#9ca3af] mb-4">
            Selected work
          </div>
          <h2 className="text-[2rem] font-bold text-[#e5e7eb] tracking-tight">
            Featured Projects
          </h2>
        </div>

        <p className="text-[#9ca3af] text-[0.95rem] leading-relaxed max-w-[28rem]">
          A showcase of high-performance web applications built with modern
          architecture and user-centric design.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="
              group relative p-8 rounded-3xl border border-white/10 bg-white/5
              transition-all duration-300 ease-out
              hover:bg-white/10
              hover:-translate-y-3
              hover:scale-[1.03]
              hover:shadow-[0_25px_70px_rgba(0,0,0,0.6)]
              overflow-hidden flex flex-col h-full cursor-pointer
            "
          >
            {/* ICON ROW */}
            <div className="flex justify-between items-start mb-6">
              <div
                className="
                p-3 rounded-2xl bg-white/5
                transition-all duration-300
                group-hover:scale-125
                group-hover:rotate-[-3deg]
              "
              >
                {getIcon(project.id)}
              </div>

              <div className="flex gap-3 items-center">
                {/* GitHub */}
                <span
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.githubUrl, "_blank");
                  }}
                  title="View Code"
                  className="
                    text-gray-400 cursor-pointer
                    transition-all duration-300
                    hover:text-white
                    hover:scale-125
                    hover:-translate-y-1
                  "
                >
                  <FiGithub size={20} />
                </span>

                {/* Live */}
                <span
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.liveUrl, "_blank");
                  }}
                  title="Live Demo"
                  className="
                    text-gray-400 cursor-pointer
                    transition-all duration-300
                    hover:text-cyan-400
                    hover:scale-125
                    hover:-translate-y-1
                  "
                >
                  <ExternalLink size={20} />
                </span>
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-bold text-white mb-3 transition-all duration-300 group-hover:translate-x-1">
              {project.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow transition-all duration-300 group-hover:text-gray-300">
              {project.description}
            </p>

            {/* TECH */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {project.tech.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="
                    text-[10px] uppercase tracking-wider px-2 py-1 rounded-md
                    bg-white/5 text-gray-400 border border-white/5
                    transition-all duration-300
                    group-hover:border-white/20
                    group-hover:text-gray-300
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* GLOW */}
            <div
              className="
              absolute inset-0 rounded-3xl
              bg-gradient-to-br from-cyan-500/10 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              pointer-events-none
            "
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
