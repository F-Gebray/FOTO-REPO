export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "React (Hooks, Context, Router)",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5 & Semantic Markup",
      "CSS3 / Flexbox / Grid",
      "Responsive & Mobile-first Design",
      "Tailwind CSS / Material UI",
      "Component-driven Development",
      "Accessibility (a11y best practices)",
    ],
  },
  {
    title: "Tools & Workflow",
    items: [
      "Git & GitHub (Version Control & Collaboration)",
      "VS Code / Cursor / DevTools",
      "REST & GraphQL APIs",
      "NPM / Yarn",
      "Vite (Build Tool)",
      "Figma / UI Design & Prototyping",
      "Postman / API Testing",
      "ESLint & Prettier (Code Quality)",
    ],
  },
  {
    title: "Concepts & Best Practices",
    items: [
      "Component-based Architecture",
      "State Management (useState, useReducer, Context)",
      "Routing & Navigation (React Router)",
      "Testing (Vitest)",
      "AI-augmented Development (Cursor, Claude, DeepSeek)",
      "Performance Optimization",
      "Code Reusability & Maintainability",
      "Debugging & Problem-solving",
    ],
  },
];
