export interface HeroStat {
  value: string;
  label: string;
}

export interface StackItem {
  name: string;
  url: string;
}

export interface HeroData {
  availabilityText: string;
  heading: {
    normal: string;
    highlight: string;
    suffix: string;
  };
  subtitle: string;
  meta: string[];
  coreStack: StackItem[];
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
    { name: "React", url: "https://react.dev" },
    { name: "TypeScript", url: "https://www.typescriptlang.org" },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    { name: "Tailwind", url: "https://tailwindcss.com" },
    { name: "MUI", url: "https://mui.com" },
    { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    {
      name: "REST APIs",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
    },
    { name: "Vitest", url: "https://vitest.dev" },
    { name: "Git", url: "https://git-scm.com" },
  ],
  stats: [
    { value: "3+", label: "Deployed projects" },
    { value: "Vitest", label: "Tested" },
  ],
};
