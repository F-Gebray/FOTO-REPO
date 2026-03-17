import React from "react";
import { skillGroups } from "../data/skills";

const Skills = () => {
  return (
    /* section-inner + responsive padding matching your other sections */
    <div className="w-full max-w-[1100px] mx-auto px-6 py-16 md:py-24">
      {/* section-header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem] rounded-full border border-[#1f2937] bg-[rgba(15,23,42,0.9)] text-[#9ca3af] mb-4">
            Toolbox
          </div>
          <h2 className="text-[2rem] font-bold text-[#e5e7eb] tracking-tight">
            Skills
          </h2>
        </div>

        <p className="text-[#9ca3af] text-[0.95rem] leading-relaxed max-w-[28rem]">
          Technologies and concepts I work with regularly, with a focus on
          building modern React-based frontends.
        </p>
      </div>

      {/* skills-groups: Responsive grid matching the projects layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="bg-[radial-gradient(circle_at_top,#020617,#020617)] border border-[rgba(31,41,55,0.9)] rounded-[24px] p-[1.5rem] shadow-[0_18px_45px_rgba(15,23,42,0.75)] flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              {/* Small accent line next to the title */}
              <div className="w-1 h-4 bg-linear-to-b from-[#3b82f6] to-[#a855f7] rounded-full" />
              <h3 className="text-[1.1rem] font-bold text-[#e5e7eb]">
                {group.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-[0.8rem] px-[0.8rem] py-[0.4rem] rounded-lg border border-[rgba(55,65,81,0.9)] bg-[rgba(15,23,42,0.9)] text-[#9ca3af] hover:text-[#e5e7eb] hover:border-[#3b82f6] transition-all cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
