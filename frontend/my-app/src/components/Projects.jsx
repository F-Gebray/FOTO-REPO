import React from "react";
import projects from "../data/projects";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    /* section-inner + responsive padding matching your About section */
    <div className="w-full max-w-[1100px] mx-auto px-6 py-16 md:py-24">
      {/* section-header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          {/* section-badge */}
          <div className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem] rounded-full border border-[#1f2937] bg-[rgba(15,23,42,0.9)] text-[#9ca3af] mb-4">
            Selected work
          </div>
          {/* section-title */}
          <h2 className="text-[2rem] font-bold text-[#e5e7eb] tracking-tight">
            Projects
          </h2>
        </div>

        {/* section-description */}
        <p className="text-[#9ca3af] text-[0.95rem] leading-relaxed max-w-[28rem]">
          A selection of projects that demonstrate my approach to UI, state
          management, and working with external data.
        </p>
      </div>

      {/* projects-grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {projects.map((project) => (
          /* Wrap in a div to ensure the h-full in ProjectCard works correctly */
          <div key={project.id} className="h-full">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
