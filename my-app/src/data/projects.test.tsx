import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

describe("ProjectCard", () => {
  test("renders project title", () => {
    const project = projects[0];

    render(<ProjectCard {...project} />);

    // FIX: avoid role + name typing issues
    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toHaveTextContent(project.title);
  });

  test("renders GitHub link when available", () => {
    const project = projects.find((p) => p.githubUrl);

    expect(project).toBeDefined();

    render(<ProjectCard {...project!} />);

    const githubLink = screen.getByRole("link", { name: /code/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", project!.githubUrl);
  });

  test("renders Live link when available", () => {
    const project = projects.find((p) => p.liveUrl);

    expect(project).toBeDefined();

    render(<ProjectCard {...project!} />);

    const liveLink = screen.getByRole("link", { name: /live/i });

    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("href", project!.liveUrl);
  });
});
