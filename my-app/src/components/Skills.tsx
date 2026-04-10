import React from "react";
import { motion, type Variants } from "framer-motion";
import { skillGroups } from "../data/skills";

interface SkillGroup {
  title: string;
  items: string[];
}

// container stagger
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// card animation
const card: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Skills: React.FC = () => {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-16 md:py-24">
      {/* header */}
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

      {/* grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {(skillGroups as SkillGroup[]).map((group) => (
          <motion.div
            key={group.title}
            variants={card}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
            }}
            className="relative overflow-hidden
            bg-[radial-gradient(circle_at_top,#020617,#020617)]
            border border-[rgba(31,41,55,0.9)]
            rounded-[24px] p-[1.5rem]
            shadow-[0_18px_45px_rgba(15,23,42,0.75)]
            flex flex-col gap-4"
          >
            {/* subtle glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0"
              animate={{
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />

            {/* title */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-1 h-4 bg-gradient-to-b from-[#3b82f6] to-[#a855f7] rounded-full" />
              <h3 className="text-[1.1rem] font-bold text-[#e5e7eb]">
                {group.title}
              </h3>
            </div>

            {/* tags */}
            <div className="flex flex-wrap gap-2 relative z-10">
              {group.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="text-[0.8rem] px-[0.8rem] py-[0.4rem]
                  rounded-lg border border-[rgba(55,65,81,0.9)]
                  bg-[rgba(15,23,42,0.9)] text-[#9ca3af]
                  hover:text-[#e5e7eb] hover:border-[#3b82f6]
                  transition-all cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
