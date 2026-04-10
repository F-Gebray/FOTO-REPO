import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { heroData as defaultHeroData } from "../../data/heroData";
import { scrollToSection } from "../../utils/scrollToSection";
import Button from "../ui/Button";
import Pill from "../ui/Pill";
import Stat from "../ui/Stat";

type HeroData = typeof defaultHeroData;

type HeroProps = {
  data?: HeroData;
};

const Hero: React.FC<HeroProps> = ({ data = defaultHeroData }) => {
  const { availabilityText, heading, subtitle, meta, coreStack, stats } = data;

  return (
    <section className="pt-20 pb-12 px-6 flex justify-center bg-[#0f172a]">
      <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <Pill>
            <span className="w-[5px] h-[5px] rounded-full bg-green-500 mr-2" />
            {availabilityText}
          </Pill>

          <h1 className="mt-6 text-[clamp(2.4rem,4vw,3.1rem)] font-bold text-[#e5e7eb] leading-tight">
            {heading.normal}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400">
              {heading.highlight}
            </span>{" "}
            {heading.suffix}
          </h1>

          <p className="mt-4 text-[#9ca3af] max-w-[30rem]">{subtitle}</p>

          {/* META */}
          <div className="flex flex-wrap gap-5 mt-6 mb-8 text-[0.8rem] text-[#9ca3af]">
            {meta.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-[1px] h-[10px] bg-[#1f2937]" />
                {item}
              </span>
            ))}
          </div>

          {/* BUTTONS (HOVER FIXED) */}
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={() => scrollToSection("projects")}>
                View projects <FiArrowRight size={16} />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="secondary"
                onClick={() => scrollToSection("contact")}
              >
                Contact me
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-end"
        >
          {/* CARD (HOVER FIXED) */}
          <motion.div
            whileHover={{ scale: 1.03, y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="bg-[radial-gradient(circle_at_top,#020617,#020617)]
            border border-[rgba(31,41,55,0.9)]
            rounded-[24px] p-[1.4rem]
            shadow-[0_18px_45px_rgba(15,23,42,0.75)]
            w-full max-w-[340px] flex flex-col gap-6"
          >
            {/* TITLE */}
            <Pill>Portfolio overview</Pill>

            {/* STATS (HOVER FIXED) */}
            <div className="flex flex-wrap gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Stat value={stat.value} label={stat.label} />
                </motion.div>
              ))}
            </div>

            {/* DIVIDER */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(31,41,55,0.9)] to-transparent" />

            {/* TECH STACK (HOVER FIXED) */}
            <div className="flex flex-wrap gap-2">
              {coreStack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(59,130,246,0.15)",
                  }}
                  className="text-[0.7rem] px-3 py-1 rounded-full border border-[rgba(55,65,81,0.9)]
                  bg-[rgba(15,23,42,0.9)] text-[#9ca3af] cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center text-[0.75rem] text-[#9ca3af]">
              <span>Open to junior / frontend roles</span>
              <span className="text-[10px] opacity-50">🚀</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
