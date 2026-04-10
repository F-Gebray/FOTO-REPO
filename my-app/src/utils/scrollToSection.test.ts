import { describe, test, expect, vi, beforeEach } from "vitest";
import { scrollToSection } from "./scrollToSection";

describe("scrollToSection utility", () => {
  // Mock scrollIntoView since JSDOM doesn't provide it
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    document.body.innerHTML = ""; // Reset DOM
  });

  test("calls scrollIntoView when element exists", () => {
    const targetId = "test-section";
    const element = document.createElement("div");
    element.id = targetId;
    document.body.appendChild(element);

    scrollToSection(targetId);

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  test("does not call scrollIntoView when element does not exist", () => {
    const spy = vi.spyOn(window.HTMLElement.prototype, "scrollIntoView");

    scrollToSection("non-existent-id");

    expect(spy).not.toHaveBeenCalled();
  });
});
