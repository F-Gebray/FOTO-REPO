import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Contact from "./Contact";

// Mock EmailJS so we don't send real emails during tests
vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(() => Promise.resolve({ status: 200, text: "OK" })),
  },
}));

describe("Contact Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("updates character counter as user types", () => {
    render(<Contact />);
    const textarea = screen.getByPlaceholderText(/tell me about your project/i);
    const counter = screen.getByText(/0 \/ 500/i);

    fireEvent.change(textarea, { target: { value: "Hello World" } });

    expect(screen.getByText(/11 \/ 500/i)).toBeInTheDocument();
  });

  test("character counter turns red when limit is reached", () => {
    render(<Contact />);
    const textarea = screen.getByPlaceholderText(/tell me about your project/i);

    // Simulate typing 500 characters
    fireEvent.change(textarea, { target: { value: "a".repeat(500) } });

    const counter = screen.getByText(/500 \/ 500/i);
    expect(counter).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  test("submit button is disabled and shows 'Sending...' during submission", async () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/you@example.com/i);
    const textarea = screen.getByPlaceholderText(/tell me about your project/i);
    const submitBtn = screen.getByRole("button", { name: /send message/i });

    // Fill out form
    fireEvent.change(nameInput, { target: { value: "Fitwi" } });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(textarea, { target: { value: "Test message" } });

    // Click submit
    fireEvent.click(submitBtn);

    // Verify React 19 isPending state logic
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/sending\.\.\./i)).toBeInTheDocument();
  });

  test("clears character counter when 'Clear' button is clicked", () => {
    render(<Contact />);
    const textarea = screen.getByPlaceholderText(/tell me about your project/i);
    const clearBtn = screen.getByRole("button", { name: /clear/i });

    fireEvent.change(textarea, { target: { value: "Some text" } });
    expect(screen.getByText(/9 \/ 500/i)).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(screen.getByText(/0 \/ 500/i)).toBeInTheDocument();
  });
});
