import React from "react";
import { motion } from "framer-motion";
import { Code2, Briefcase, Rocket, Sparkles, ArrowRight } from "lucide-react";

const About: React.FC = () => {
  const projects = [
    {
      title: "Admin Dashboard",
      description: "Analytics charts, dynamic tables, and dark mode",
      tech: ["React", "Recharts", "Tailwind"],
      liveUrl: "https://vercel.com/fitwis-projects/my-dashboard",
    },
    {
      title: "Hotel Booking Platform",
      description: "Luxury travel platform with real-time reservations",
      tech: ["React Router", "Tailwind", "API Integration"],
      liveUrl: "https://vercel.com/fitwis-projects/hotel-reservation",
    },
    {
      title: "Agency Landing Page",
      description: "Animated navigation and premium UI",
      tech: ["TypeScript", "Framer Motion", "Tailwind"],
      liveUrl: "https://vercel.com/fitwis-projects/web-page",
    },
    {
      title: "Modern Shopping Store",
      description: "Full-screen UI with destination search",
      tech: ["React", "Tailwind CSS", "Responsive Design"],
      liveUrl: "https://vercel.com/fitwis-projects/fg-store",
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-24 md:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">
              Who I Am
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Me
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto" />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE - Bio */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10">
              <p className="text-gray-300 text-base leading-relaxed">
                I'm a{" "}
                <span className="text-cyan-400 font-semibold">
                  self-taught frontend developer
                </span>{" "}
                based near 's-Hertogenbosch, passionate about building scalable,
                maintainable, and production-ready React applications.
              </p>
            </div>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I focus on{" "}
                <span className="text-white font-medium">
                  modular architecture, reusable components, clean routing, and
                  data-driven UI composition
                </span>{" "}
                to create seamless user experiences.
              </p>

              <p>
                I work with an{" "}
                <span className="text-cyan-400 font-medium">
                  AI-augmented workflow
                </span>{" "}
                — using tools like Cursor, Claude, and DeepSeek to write cleaner
                code faster. I back every build with testing and deploy on
                Vercel.
              </p>

              <p>
                I enjoy creating applications that balance user experience with
                engineering best practices. Always learning new technologies and
                applying them to real-world problems.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <Code2 size={24} className="text-cyan-400 mx-auto mb-2" />
                <div className="text-white font-bold text-xl">4+</div>
                <div className="text-gray-500 text-xs">Projects Completed</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <Rocket size={24} className="text-purple-400 mx-auto mb-2" />
                <div className="text-white font-bold text-xl">100%</div>
                <div className="text-gray-500 text-xs">Deployed</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Featured Projects */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={20} className="text-cyan-400" />
              <h3 className="text-white font-semibold text-lg">
                Featured Projects
              </h3>
            </div>

            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="block p-5 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h4>
                  <ArrowRight
                    size={16}
                    className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center"
            >
              <p className="text-white font-semibold mb-2">
                🌟 Open for Opportunities
              </p>
              <p className="text-gray-400 text-sm">
                Currently seeking a junior or frontend role where I can
                contribute, learn, and grow with a collaborative team.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs text-green-400">
                  Available for work
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
