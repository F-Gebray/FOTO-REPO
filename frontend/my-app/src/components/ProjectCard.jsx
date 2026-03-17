import React from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const ProjectCard = ({
  title,
  role,
  description,
  tech,
  liveUrl,
  githubUrl,
}) => {
  return (
    /* Added h-full to make all cards in a row the same height */
    <article className="h-full bg-[#020617] border border-[rgba(31,41,55,0.9)] rounded-[20px] p-[1.1rem] shadow-[0_14px_30px_rgba(15,23,42,0.9)] flex flex-col gap-[0.9rem] transition-all duration-150 hover:-translate-y-[3px] hover:shadow-[0_24px_50px_rgba(15,23,42,0.95)] hover:border-[rgba(55,65,81,0.9)]">
      {/* project-image container */}
      <div className="relative h-[160px] rounded-[14px] overflow-hidden bg-linear-to-br from-[#1e293b] to-[#020617] shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent)]" />
      </div>

      {/* project-title-row */}
      <div className="flex justify-between items-center gap-[0.75rem]">
        <h3 className="text-[1rem] font-bold text-[#e5e7eb]">{title}</h3>
        <span className="text-[0.7rem] px-[0.6rem] py-[0.25rem] rounded-full bg-[rgba(15,23,42,0.9)] border border-[#1f2937] text-[#9ca3af] whitespace-nowrap">
          {role}
        </span>
      </div>

      {/* Description: Removed line-clamp to show full text */}
      <p className="text-[0.9rem] text-[#9ca3af] leading-relaxed">
        {description}
      </p>

      {/* Tech Pills container */}
      <div className="flex flex-wrap gap-2">
        {tech?.length
          ? tech.map((item) => (
              <span
                key={item}
                className="text-[0.7rem] px-[0.7rem] py-[0.3rem] rounded-full border border-[rgba(55,65,81,0.9)] bg-[rgba(15,23,42,0.9)] text-[#9ca3af]"
              >
                {item}
              </span>
            ))
          : null}
      </div>

      {/* mt-auto pushes these links to the very bottom of the card */}
      <div className="flex gap-4 mt-auto pt-4 border-t border-[#1f2937]/50">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[0.85rem] text-[#9ca3af] hover:text-[#3b82f6] transition-colors"
          >
            <FiGithub size={14} />
            <span>Code</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[0.85rem] text-[#9ca3af] hover:text-[#3b82f6] transition-colors"
          >
            <FiExternalLink size={14} />
            <span>Live</span>
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
