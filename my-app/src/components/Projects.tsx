import React, { useState } from "react";
import projects from "../data/projects";
import { ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";

// Real image URLs for each project type
const getProjectImage = (type: string): string => {
  switch (type) {
    case "dashboard":
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop";
    case "hotel":
      return "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=450&fit=crop";
    case "agency":
      return "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=450&fit=crop";
    case "store":
      return "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=450&fit=crop";
    default:
      return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop";
  }
};

// Fallback images with gradients if images don't load
const getFallbackImage = (type: string) => {
  switch (type) {
    case "dashboard":
      return "linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)";
    case "hotel":
      return "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)";
    case "agency":
      return "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)";
    case "store":
      return "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)";
    default:
      return "linear-gradient(135deg, #475569 0%, #334155 100%)";
  }
};

// Determine project type based on title
const getProjectType = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("dashboard") || lowerTitle.includes("admin"))
    return "dashboard";
  if (
    lowerTitle.includes("hotel") ||
    lowerTitle.includes("booking") ||
    lowerTitle.includes("premium")
  )
    return "hotel";
  if (
    lowerTitle.includes("agency") ||
    lowerTitle.includes("landing") ||
    lowerTitle.includes("stellar")
  )
    return "agency";
  if (
    lowerTitle.includes("store") ||
    lowerTitle.includes("shopping") ||
    lowerTitle.includes("modern")
  )
    return "store";
  return "default";
};

const Projects: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleCardClick = (liveUrl: string) => {
    window.open(liveUrl, "_blank");
  };

  const handleImageError = (projectId: number) => {
    setImgErrors((prev) => ({ ...prev, [projectId]: true }));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">
              Portfolio Showcase
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Projects
            </span>
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Building scalable, performant, and user-centric web applications
            with modern technologies.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mt-6" />
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 pb-8 border-t border-b border-white/10 py-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {projects.length}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Projects Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Live Deployment
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Modern</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Tech Stack
            </div>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const projectType = getProjectType(project.title);
            const imageUrl = getProjectImage(projectType);
            const hasError = imgErrors[project.id];

            return (
              <div
                key={project.id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleCardClick(project.liveUrl)}
              >
                {/* Glow effect */}
                {hoveredId === project.id && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-30 transition-opacity duration-500" />
                )}

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-cyan-500/30 hover:-translate-y-2">
                  {/* Real Image at the top */}
                  <div className="relative w-full h-48 overflow-hidden">
                    {!hasError ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => handleImageError(project.id)}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: getFallbackImage(projectType) }}
                      >
                        <span className="text-white text-lg font-semibold opacity-80">
                          {project.title}
                        </span>
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                    {/* Project badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="text-xs px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white">
                        {projectType === "dashboard" && "📊 Dashboard"}
                        {projectType === "hotel" && "🏨 Hotel"}
                        {projectType === "agency" && "🎨 Agency"}
                        {projectType === "store" && "🛍️ E-commerce"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="relative p-6 flex flex-col h-full">
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, "_blank");
                        }}
                        className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-gray-400 transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-110"
                        title="View Source Code"
                      >
                        <FiGithub size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveUrl, "_blank");
                        }}
                        className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-gray-400 transition-all duration-300 hover:bg-cyan-500/30 hover:text-cyan-400 hover:scale-110"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/10 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:text-cyan-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Click indicator */}
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-cyan-400 transition-all duration-300">
                      <span>View Project</span>
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER CTA */}
        <div className="text-center mt-20 pt-8 border-t border-white/10">
          <a
            href="https://github.com/F-Gebray/FOTO-REPO"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-gray-300 font-medium transition-all duration-300 hover:scale-105 hover:border-cyan-500/60 hover:text-white"
          >
            <FiGithub size={18} />
            <span>View All Projects on GitHub</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <p className="text-xs text-gray-500 mt-6">
            All projects are fully responsive, deployed, and built with
            production-ready code
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
