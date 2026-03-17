import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

describe("ProjectCard", () => {
  test("renders a project card with correct title", () => {
    const project = projects[0];

    render(
      <ProjectCard
        title={project.title}
        role={project.role}
        description={project.description}
        tech={project.tech}
        liveUrl={project.liveUrl}
        githubUrl={project.githubUrl}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: project.title }),
    ).toBeInTheDocument();
  });

  test("renders GitHub link when githubUrl exists", () => {
    // pick a project that actually has a GitHub URL
    const project = projects.find((p) => p.githubUrl);

    expect(project).toBeDefined(); // safety check

    render(<ProjectCard {...project} />);

    const githubLink = screen.getByRole("link", { name: /code/i });
    expect(githubLink).toHaveAttribute("href", project.githubUrl);
  });

  test("renders Live link when liveUrl exists", () => {
    // pick a project that actually has a Live URL
    const project = projects.find((p) => p.liveUrl);

    expect(project).toBeDefined(); // safety check

    render(<ProjectCard {...project} />);

    const liveLink = screen.getByRole("link", { name: /live/i });
    expect(liveLink).toHaveAttribute("href", project.liveUrl);
  });
});
