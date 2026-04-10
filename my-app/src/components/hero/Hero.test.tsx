import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import Hero from "./Hero";
import { heroData } from "../../data/heroData";

describe("Hero Component", () => {
  test("renders main heading and subtitle", () => {
    render(<Hero />);

    expect(
      screen.getByText(/clean, modern web interfaces/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/I focus on translating ideas/i),
    ).toBeInTheDocument();
  });

  test("renders stats correctly", () => {
    render(<Hero />);

    const statsSection = document.querySelector<HTMLElement>(".hero-stats");

    expect(statsSection).not.toBeNull();

    heroData.stats.forEach((stat) => {
      expect(within(statsSection!).getByText(stat.value)).toBeInTheDocument();

      expect(within(statsSection!).getByText(stat.label)).toBeInTheDocument();
    });
  });

  test("renders CTA buttons", () => {
    render(<Hero />);

    expect(
      screen.getByRole("button", { name: /view projects/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /contact me/i }),
    ).toBeInTheDocument();
  });

  describe("Button Interactions", () => {
    let mockSection: HTMLDivElement;

    beforeEach(() => {
      mockSection = document.createElement("div");
      mockSection.id = "projects";
      mockSection.scrollIntoView = vi.fn();
      document.body.appendChild(mockSection);
    });

    afterEach(() => {
      document.body.removeChild(mockSection);
      vi.clearAllMocks();
    });

    test("scrolls to projects section on button click", () => {
      render(<Hero />);

      fireEvent.click(screen.getByRole("button", { name: /view projects/i }));

      expect(mockSection.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    test("scrolls to contact section on button click", () => {
      mockSection.id = "contact";

      render(<Hero />);

      fireEvent.click(screen.getByRole("button", { name: /contact me/i }));

      expect(mockSection.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  test("heading has correct semantic level 1", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
