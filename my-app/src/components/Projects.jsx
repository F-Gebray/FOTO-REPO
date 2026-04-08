import React from "react";
import projects from "../data/projects";
import { Code2, Layers, Globe, Smartphone, Cpu } from "lucide-react";

import useStaggeredReveal from "../hooks/useStaggeredReveal";

const getIcon = (id) => {
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

const Projects = () => {
  const stagger = useStaggeredReveal(140);

  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-16 md:py-24">
      {/* Section Header */}
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

      {/* Projects Grid */}
      <div
        ref={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-700 opacity-0 translate-y-6 flex flex-col h-full overflow-hidden"
          >
            {/* Icon & Links Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-300">
                {getIcon(project.id)}
              </div>

              <div className="flex gap-3">
                {/* GitHub Link → now using Code2 */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Code2 size={20} />
                </a>

                {/* Live Link → also using Code2 */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Code2 size={20} />
                </a>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {/* Tech Tags Footer */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {project.tech.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Hover Glow Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
