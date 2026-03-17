import { describe, test, expect, vi, beforeEach } from "vitest";
import { scrollToSection } from "./scrollToSection";

describe("scrollToSection utility", () => {
  // Mock the scrollIntoView method since JSDOM doesn't implement it
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    document.body.innerHTML = ""; // Clear DOM before each test
  });

  test("calls scrollIntoView when element exists", () => {
    // 1. Setup: Create an element with a specific ID
    const targetId = "test-section";
    const element = document.createElement("div");
    element.id = targetId;
    document.body.appendChild(element);

    // 2. Execute: Call the utility
    scrollToSection(targetId);

    // 3. Verify: Check if the scroll method was called with correct arguments
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  test("does not crash or call scroll when element does not exist", () => {
    const scrollSpy = vi.spyOn(window.HTMLElement.prototype, "scrollIntoView");

    // Call with an ID that isn't in the DOM
    scrollToSection("non-existent-id");

    // Verify nothing happened
    expect(scrollSpy).not.toHaveBeenCalled();
  });
});
