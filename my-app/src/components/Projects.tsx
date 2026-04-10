import React from "react";
import { motion, type Variants } from "framer-motion";
import projects from "../data/projects";
import {
  Code2,
  ExternalLink,
  Layers,
  Globe,
  Smartphone,
  Cpu,
} from "lucide-react";

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

// Container animation (stagger)
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Card animation
const card: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
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

const Projects: React.FC = () => {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-16 md:py-24">
      {/* Header */}
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

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
      >
        {projects.map((project) => (
          <motion.a
            key={project.id}
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            variants={card}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 flex flex-col h-full overflow-hidden cursor-pointer"
          >
            {/* Icon + actions */}
            <div className="flex justify-between items-start mb-6">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-300"
              >
                {getIcon(project.id)}
              </motion.div>

              <div className="flex gap-3">
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.githubUrl, "_blank");
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Code2 size={20} />
                </span>

                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.liveUrl, "_blank");
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <ExternalLink size={20} />
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {project.tech.slice(0, 3).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* glow overlay */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;