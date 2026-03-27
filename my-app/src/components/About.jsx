import React from "react";

const About = () => {
  return (
    /* Increased top padding (pt-24) and significantly extended bottom padding (pb-40) */
    <div className="w-full max-w-[1100px] mx-auto px-6 pt-24 pb-40">
      {/* section-header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="inline-block px-[0.7rem] py-[0.25rem] text-[0.75rem] rounded-full border border-[#1f2937] bg-[rgba(15,23,42,0.9)] text-[#9ca3af] mb-4">
            Background
          </div>
          <h2 className="text-[2rem] font-bold text-[#e5e7eb] tracking-tight">
            About me
          </h2>
        </div>
      </div>

      {/* about-grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-[4.5rem] items-start">
        {/* about-text (Left Side) */}
        <div className="text-[1.05rem] leading-[1.9] text-[#9ca3af]">
          <p>
            I&apos;m a frontend engineer passionate about building scalable,
            maintainable, and production-ready React applications. I focus on
            <span className="text-[#e5e7eb] font-semibold">
              {" "}
              modular architecture, reusable components, clean routing, and
              data-driven UI composition
            </span>
            .
          </p>

          {/* Increased margin-top (mt-10) to extend the section vertically */}
          <ul className="mt-10 space-y-8">
            <li>
              <span className="text-[#e5e7eb] font-bold block mb-1">
                • Modern Booking App:
              </span>
              Demonstrates routing, reusable components, and scalable folder
              structure.
              <a
                href="https://foto-repo-booking.vercel.app/"
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
              Analytics charts, tables, and dark mode built with React and
              Recharts.
              <a
                href="https://foto-repo-dashboard.vercel.app/"
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
              Full-screen UI, destination search, and responsive design built
              with React.
              <a
                href="https://foto-repo-travel-app.vercel.app/"
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
              clear feedback, and collaborate with designers and developers to
              ship products that users actually enjoy using.
            </p>
          </div>
        </div>

        {/* about-highlight (Right Card) */}
        <div className="bg-[radial-gradient(circle_at_top,#020617,#020617)] border border-[rgba(31,41,55,0.9)] rounded-[32px] p-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.8)] sticky top-32">
          <p className="text-[1.25rem] font-semibold text-[#e5e7eb] leading-snug">
            I&apos;m currently seeking a junior or frontend role where I can:
          </p>
          <ul className="mt-8 pl-[1.5rem] text-[1.05rem] leading-[1.8] text-[#9ca3af] list-disc marker:text-[#3b82f6] space-y-6">
            <li>
              Apply and deepen my React skills by working on real-world,
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
        </div>
      </div>
    </div>
  );
};

export default About;
