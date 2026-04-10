export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  availabilityText: string;
  heading: {
    normal: string,
    highlight: string,
    suffix: string,
  };
  subtitle: string;
  meta: string[];
  coreStack: string[];
  stats: HeroStat[];
}

export const heroData: HeroData = {
  availabilityText: "Available for frontend opportunities",
  heading: {
    normal: "I build",
    highlight: "clean, modern web interfaces",
    suffix: "with React.",
  },
  subtitle:
    "I focus on translating ideas into fast, responsive, and accessible interfaces. Strong in React, TypeScript, and building UI that feels polished and intentional — tested with Vitest and deployed on Vercel.",
  meta: ["Location: Netherlands (open to remote)", "Focus: Frontend / React"],
  coreStack: [
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind",
    "MUI",
    "HTML5",
    "CSS3",
    "REST APIs",
    "Vitest",
    "Git",
  ],
  stats: [
    { value: "4+", label: "Deployed projects" },
    { value: "Vitest", label: "Tested" },
  ],
};
