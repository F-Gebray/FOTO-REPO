import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest"; // Modern Vitest imports
import Hero from "./Hero";
import { heroData } from "../../data/heroData";

// 1. Mock scrollIntoView using Vitest 'vi' global
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("Hero Component", () => {
  // --------- Render Tests ---------
  test("renders main heading and subtitle", () => {
    render(<Hero data={heroData} />);

    // Using regex (i) for flexible text matching
    expect(
      screen.getByText(/clean, modern web interfaces/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I focus on translating ideas/i),
    ).toBeInTheDocument();
  });

  test("renders stats correctly", () => {
    render(<Hero data={heroData} />);
    const statsSection = document.querySelector(".hero-stats");

    heroData.stats.forEach((stat) => {
      expect(within(statsSection).getByText(stat.value)).toBeInTheDocument();
      expect(within(statsSection).getByText(stat.label)).toBeInTheDocument();
    });
  });

  test("renders CTA buttons", () => {
    render(<Hero data={heroData} />);
    expect(
      screen.getByRole("button", { name: /view projects/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /contact me/i }),
    ).toBeInTheDocument();
  });

  describe("Button Interactions", () => {
    let mockSection;

    beforeEach(() => {
      // Create a dummy element to act as the scroll target
      mockSection = document.createElement("div");
      mockSection.id = "projects"; // Will change to 'contact' in the second test
      mockSection.scrollIntoView = vi.fn();
      document.body.appendChild(mockSection);
    });

    afterEach(() => {
      document.body.removeChild(mockSection);
      vi.clearAllMocks(); // Clear call counts between tests
    });

    test("scrolls to projects section on button click", () => {
      render(<Hero data={heroData} />);

      fireEvent.click(screen.getByRole("button", { name: /view projects/i }));

      expect(mockSection.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    test("scrolls to contact section on button click", () => {
      mockSection.id = "contact";

      render(<Hero data={heroData} />);

      fireEvent.click(screen.getByRole("button", { name: /contact me/i }));

      expect(mockSection.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  test("heading has correct semantic level 1", () => {
    render(<Hero data={heroData} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
