export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Admin Dashboard",
    description:
      "Production-ready admin dashboard with interactive analytics charts, dynamic user tables, and dark mode — built with React, MUI, and Recharts.",
    tech: ["React", "Material UI", "Recharts"],
    liveUrl: "https://dashboard-seven-psi-14.vercel.app/",
    githubUrl: "https://github.com/F-Gebray/FOTO-REPO", // TODO: link to specific repo
  },
  {
    id: 2,
    title: "Premium Architecture Booking",
    description:
      "Luxury travel platform with dynamic property listings, real-time reservations, and email integration via EmailJS — fully responsive across devices.",
    tech: ["Tailwind", "EmailJS", "React Router"],
    liveUrl: "https://foto-booking.vercel.app/",
    githubUrl: "https://github.com/F-Gebray/FOTO-REPO", // TODO: link to specific repo
  },
  {
    id: 3,
    title: "Travel Planner App",
    description:
      "Full-screen travel application with destination search, responsive layout, and smooth navigation — built with React and Material UI.",
    tech: ["React", "Vite", "Material UI"],
    liveUrl: "https://landing-page-omega-two-35.vercel.app/",
    githubUrl: "https://github.com/F-Gebray/FOTO-REPO", // TODO: link to specific repo
  },
  {
    id: 4,
    title: "Stellar Web Solutions",
    description:
      "High-performance agency landing page with animated navigation, premium UI components, and fluid motion — built with TypeScript and Framer Motion.",
    tech: ["TypeScript", "Framer Motion", "Tailwind"],
    liveUrl: "https://web-page-sand-five.vercel.app/",
    githubUrl: "https://github.com/F-Gebray/FOTO-REPO", // TODO: link to specific repo
  },
];

export default projects;
