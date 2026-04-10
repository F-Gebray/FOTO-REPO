import React from "react";
import { motion, type Variants } from "framer-motion";

interface ServiceItem {
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    title: "🚀 Landing Page Development",
    description:
      "High-converting, fast, and modern landing pages built with React and Tailwind CSS.",
  },
  {
    title: "💼 Business Website Development",
    description:
      "Fully responsive websites for small businesses, freelancers, and agencies.",
  },
  {
    title: "📊 Dashboard & Web App UI",
    description:
      "Custom dashboards, admin panels, and interactive UIs using React and Tailwind.",
  },
  {
    title: "🎨 Figma → React Conversion",
    description:
      "Pixel-perfect implementation of your Figma or Sketch designs into clean React components.",
  },
  {
    title: "⚡ Performance Optimization",
    description:
      "Fixing UI issues, improving load times, and optimizing React components.",
  },
  {
    title: "☁️ Deployment & Hosting",
    description:
      "End-to-end deployment on Vercel, Netlify, or custom hosting with full optimization.",
  },
];

// container stagger
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// card animation
const card: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
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

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="relative z-10 bg-[#020617] bg-[radial-gradient(circle_at_top,#0a0f1f_0,#020617_50%,#000_100%)]"
    >
      <div className="w-full max-w-[1100px] mx-auto px-6 py-16 md:py-24">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem] rounded-full border border-[#1f2937] bg-[rgba(15,23,42,0.9)] text-[#e5e7eb] mb-4">
              What I Offer
            </div>

            <h2 className="text-[2rem] font-bold text-[#e5e7eb] tracking-tight">
              Services
            </h2>
          </div>

          <p className="text-[#9ca3af] text-[0.95rem] leading-relaxed max-w-[28rem]">
            A set of services I provide to help businesses and individuals build
            fast, modern, and scalable web experiences.
          </p>
        </div>

        {/* grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              className="relative overflow-hidden rounded-[18px] p-6
              bg-[#020617]
              bg-[radial-gradient(circle_at_top,#020617,#000)]
              border border-[rgba(31,41,55,0.9)]
              shadow-[0_14px_30px_rgba(15,23,42,0.9)]
              hover:border-[#3b82f6]"
            >
              {/* subtle glow animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0"
                animate={{
                  opacity: [0, 0.25, 0],
                  x: [-20, 0, 20],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              <h3 className="text-xl font-semibold mb-3 text-[#e5e7eb] relative z-10">
                {service.title}
              </h3>

              <p className="text-[#9ca3af] relative z-10">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
