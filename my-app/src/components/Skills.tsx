import React from "react";
import { motion, type Variants } from "framer-motion";
import { skillGroups } from "../data/skills";
import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Rocket
} from "lucide-react";

interface SkillGroup {
  title: string;
  items: string[];
}

// Get icon based on category title
const getCategoryIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("frontend") || lowerTitle.includes("react")) {
    return <Layout size={20} className="text-cyan-400" />;
  }
  if (lowerTitle.includes("backend") || lowerTitle.includes("node")) {
    return <Server size={20} className="text-purple-400" />;
  }
  if (lowerTitle.includes("database")) {
    return <Database size={20} className="text-blue-400" />;
  }
  return <Code2 size={20} className="text-cyan-400" />;
};

// Container stagger animation
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Card animation
const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const Skills: React.FC = () => {
  // Calculate total skills count
  const totalSkills = skillGroups.reduce((acc, group) => acc + group.items.length, 0);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        
        {/* HEADER - Professional */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">
              Technical Expertise
            </span>
          </div>
          
          {/* Title */}
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">My </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Tech Stack
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mt-4" />
          </div>
          
          {/* Subtitle */}
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Modern tools and technologies I leverage to build high-performance, 
            scalable web applications.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Rocket size={16} className="text-cyan-400" />
              <span className="text-gray-300 text-sm">Modern Stack</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-gray-300 text-sm">Performance First</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Shield size={16} className="text-green-400" />
              <span className="text-gray-300 text-sm">Type Safe</span>
            </div>
          </div>
        </div>

        {/* SKILLS GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              variants={card}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 overflow-hidden">
                {/* Header with gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
                
                <div className="p-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                      {getCategoryIcon(group.title)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {group.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {group.items.length} technologies
                      </p>
                    </div>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item, idx) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.08,
                          y: -2,
                        }}
                        className="
                          inline-flex items-center gap-1.5
                          text-[13px] font-medium px-3.5 py-2
                          rounded-xl
                          bg-white/5
                          border border-white/10
                          text-gray-300
                          hover:bg-cyan-500/10
                          hover:border-cyan-500/50
                          hover:text-cyan-400
                          transition-all duration-300
                          cursor-default
                        "
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover/item:opacity-100" />
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM CTA - Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-20 pt-8"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm">
              Looking for a React developer for your next project?
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-400 font-medium hover:scale-105 transition-all duration-300"
            >
              <span>Let's work together</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
