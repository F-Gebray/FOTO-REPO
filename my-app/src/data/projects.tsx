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
      "Production-ready admin dashboard with interactive analytics charts, dynamic user tables, and dark mode — built with React, Tailwind CSS, and Recharts.",
    tech: ["React", "Tailwind CSS", "Recharts"],
    liveUrl: "https://github.com/F-Gebray/FOTO-REPO/tree/main/my-dashboard",
    githubUrl: "https://github.com/F-Gebray/FOTO-REPO/tree/main/dashboard", // TODO: link to specific repo
  },
  {
    id: 2,
    title: "Premium Architecture Booking",
    description:
      "Luxury travel platform with dynamic property listings, real-time reservations, and email integration via EmailJS — fully responsive across devices.",
    tech: ["Tailwind CSS", "EmailJS", "React Router", "TypeScript"],
    liveUrl:
      "https://github.com/F-Gebray/FOTO-REPO/tree/main/hotel-reservation",
    githubUrl:
      "https://github.com/F-Gebray/FOTO-REPO/tree/main/hotel-reservation", // TODO: link to specific repo
  },
  {
    id: 3,
    title: "FG-STORE",
    description:
      "Full-screen travel application with destination search, responsive layout, and smooth navigation — built with React and Tailwind CSS.",
    tech: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://vercel.com/fitwis-projects/fg-store",
    githubUrl: "https://github.com/F-Gebray/FOTO-REPO/tree/main/FG-STORE",
  },
  {
    id: 4,
    title: "Stellar Web Solutions",
    description:
      "High-performance agency landing page with animated navigation, premium UI components, and fluid motion — built with TypeScript and Framer Motion.",
    tech: ["TypeScript", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://vercel.com/fitwis-projects/web-page",
    githubUrl: "https://github.com/F-Gebray/FOTO-REPO/tree/main/webDev-page", // TODO: link to specific repo
  },
];

export default projects;
