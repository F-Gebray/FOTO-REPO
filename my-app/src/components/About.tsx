import React from "react";
import { motion } from "framer-motion";
import useReveal from "../hooks/useReveal";

const About: React.FC = () => {
  const reveal = useReveal();

  return (
    <section id="about" className="section">
      <div
        ref={reveal}
        className="section-inner w-full max-w-[1100px] mx-auto px-6 pt-24 pb-40
        transition-all duration-700 opacity-0 translate-y-6"
      >
        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div
              className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem]
              rounded-full border border-[#1f2937]
              bg-[rgba(15,23,42,0.9)] text-[#9ca3af] mb-4"
            >
              Background
            </div>

            <h2 className="text-[2rem] font-bold text-[#e5e7eb] tracking-tight">
              About me
            </h2>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-[4.5rem] items-start">
          {/* LEFT SIDE */}
          <div className="text-[1.05rem] leading-[1.9] text-[#9ca3af]">
            <p>
              I&apos;m a self-taught frontend developer based near
              &apos;s-Hertogenbosch, passionate about building scalable,
              maintainable, and production-ready React applications. I focus on
              <span className="text-[#e5e7eb] font-semibold">
                {" "}
                modular architecture, reusable components, clean routing, and
                data-driven UI composition
              </span>
              .
            </p>

            <p className="mt-6">
              I work with an AI-augmented workflow — using tools like{" "}
              <span className="text-[#e5e7eb] font-semibold">
                Cursor, Claude, and DeepSeek
              </span>{" "}
              to write cleaner code faster. I back every build with{" "}
              <span className="text-[#e5e7eb] font-semibold">Vitest</span> and
              deploy on Vercel.
            </p>

            {/* PROJECTS LIST WITH LIVE DEMOS RESTORED */}
            <ul className="mt-10 space-y-8">
              <li>
                <span className="text-[#e5e7eb] font-bold block mb-1">
                  • Stellar Web Solutions:
                </span>
                Agency landing page with animated navigation and premium UI —
                built with TypeScript and Framer Motion.
                <a
                  href="https://vercel.com/fitwis-projects/web-page"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3b82f6] hover:text-[#60a5fa] ml-1 transition-colors underline underline-offset-4 decoration-[#3b82f6]/30 font-medium"
                >
                  Live Demo →
                </a>
              </li>

              <li>
                <span className="text-[#e5e7eb] font-bold block mb-1">
                  • Premium Architecture Booking:
                </span>
                Luxury travel platform with real-time reservations and email
                integration — built with Tailwind and React Router.
                <a
                  href="https://vercel.com/fitwis-projects/new-bookingapp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3b82f6] hover:text-[#60a5fa] ml-1 transition-colors underline underline-offset-4 decoration-[#3b82f6]/30 font-medium"
                >
                  Live Demo →
                </a>
              </li>

              <li>
                <span className="text-[#e5e7eb] font-bold block mb-1">
                  • Admin Dashboard:
                </span>
                Analytics charts, dynamic tables, and dark mode built with
                React, MUI, and Recharts.
                <a
                  href="https://vercel.com/fitwis-projects/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3b82f6] hover:text-[#60a5fa] ml-1 transition-colors underline underline-offset-4 decoration-[#3b82f6]/30 font-medium"
                >
                  Live Demo →
                </a>
              </li>

              <li>
                <span className="text-[#e5e7eb] font-bold block mb-1">
                  • Travel Planner App:
                </span>
                Full-screen UI with destination search and responsive design —
                built with React and Tailwind CSS.
                <a
                  href="https://vercel.com/fitwis-projects/fg-store"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3b82f6] hover:text-[#60a5fa] ml-1 transition-colors underline underline-offset-4 decoration-[#3b82f6]/30 font-medium"
                >
                  Live Demo →
                </a>
              </li>
            </ul>

            <div className="mt-12 space-y-6">
              <p>
                I enjoy creating applications that balance user experience with
                engineering best practices. Always learning new technologies and
                applying them to real-world problems.
              </p>

              <p>
                I like working in environments where I can learn quickly, get
                clear feedback, and collaborate with designers and developers.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (ANIMATED + HOVER ONLY HERE) */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{
              scale: 1.04,
              y: -8,
              boxShadow: "0 35px 90px rgba(59,130,246,0.15)",
            }}
            className="bg-[radial-gradient(circle_at_top,#020617,#020617)]
            border border-[rgba(31,41,55,0.9)]
            rounded-[32px] p-[2.5rem]
            shadow-[0_30px_70px_rgba(0,0,0,0.8)]
            sticky top-32 transition-all duration-300"
          >
            <p className="text-[1.25rem] font-semibold text-[#e5e7eb] leading-snug">
              I&apos;m currently seeking a junior or frontend role where I can:
            </p>

            <ul
              className="mt-8 pl-[1.5rem] text-[1.05rem] leading-[1.8]
              text-[#9ca3af] list-disc marker:text-[#3b82f6] space-y-6"
            >
              <li>
                Apply and deepen my React and TypeScript skills on real-world,
                impactful products
              </li>

              <li>
                Grow as a developer within a supportive and collaborative team
                environment
              </li>

              <li>
                Contribute meaningfully to both UI design and implementation
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
