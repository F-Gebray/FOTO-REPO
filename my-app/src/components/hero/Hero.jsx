import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { heroData } from "../../data/heroData";
import { scrollToSection } from "../../utils/scrollToSection";

import Button from "../ui/Button";
import Pill from "../ui/Pill";
import Stat from "../ui/Stat";

const Hero = () => {
  const { availabilityText, heading, subtitle, meta, coreStack, stats } =
    heroData;

  return (
    <section className="pt-20 pb-12 px-6 flex justify-center bg-[#0f172a]">
      <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-start">
          <Pill>
            <span className="w-[5px] h-[5px] rounded-full bg-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.9)] mr-2" />
            {availabilityText}
          </Pill>

          <h1 className="mt-6 text-[clamp(2.4rem,4vw,3.1rem)] font-bold tracking-tight text-[#e5e7eb] leading-tight">
            {heading.normal}{" "}
            <span className="bg-gradient-to-r from-[#60a5fa] via-[#a855f7] to-[#f97316] bg-clip-text text-transparent">
              {heading.highlight}
            </span>{" "}
            {heading.suffix}
          </h1>

          <p className="mt-4 text-[#9ca3af] text-[0.98rem] leading-relaxed max-w-[30rem]">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-5 mt-7 mb-8 text-[0.8rem] text-[#9ca3af]">
            {meta.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-[1px] h-[10px] bg-[#1f2937]" />
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button onClick={() => scrollToSection("projects")}>
              View projects <FiArrowRight size={16} />
            </Button>

            <Button
              variant="secondary"
              onClick={() => scrollToSection("contact")}
            >
              Contact me
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE (The Card) */}
        <div className="flex justify-end">
          <div className="bg-[radial-gradient(circle_at_top,#020617,#020617)] border border-[rgba(31,41,55,0.9)] rounded-[24px] p-[1.4rem] shadow-[0_18px_45px_rgba(15,23,42,0.75)] w-full max-w-[340px] flex flex-col gap-6">
            <div>
              <Pill>Portfolio overview</Pill>

              <div className="flex flex-wrap gap-4 mt-4">
                {stats.map((stat) => (
                  <Stat
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(31,41,55,0.9)] to-transparent" />

            <div>
              <div className="flex flex-wrap gap-2">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[0.7rem] px-3 py-1 rounded-full border border-[rgba(55,65,81,0.9)] bg-[rgba(15,23,42,0.9)] text-[#9ca3af]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-[0.75rem] text-[#9ca3af]">
              <span>Open to junior / frontend roles</span>
              <span className="text-[10px] opacity-50">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
