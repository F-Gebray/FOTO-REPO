import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Contact from "./Contact";

// Mock EmailJS
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

    const textarea = screen.getByPlaceholderText(
      /how can i help you/i,
    ) as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "Hello World" } });

    expect(screen.getByText(/11 \/ 500/i)).toBeInTheDocument();
  });

  test("character counter turns red when limit is reached", () => {
    render(<Contact />);

    const textarea = screen.getByPlaceholderText(
      /how can i help you/i,
    ) as HTMLTextAreaElement;

    fireEvent.change(textarea, {
      target: { value: "a".repeat(500) },
    });

    const counter = screen.getByText(/500 \/ 500/i);

    expect(counter).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  test("submit button shows sending state", async () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(
      /your name/i,
    ) as HTMLInputElement;

    const emailInput = screen.getByPlaceholderText(
      /you@example.com/i,
    ) as HTMLInputElement;

    const textarea = screen.getByPlaceholderText(
      /how can i help you/i,
    ) as HTMLTextAreaElement;

    const submitBtn = screen.getByRole("button", {
      name: /send/i,
    }) as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: "Fitwi" } });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(textarea, { target: { value: "Test message" } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    expect(screen.getByText(/sending\.\.\./i)).toBeInTheDocument();
  });

  test("clears character counter when 'Clear' is clicked", () => {
    render(<Contact />);

    const textarea = screen.getByPlaceholderText(
      /how can i help you/i,
    ) as HTMLTextAreaElement;

    const clearBtn = screen.getByRole("button", { name: /clear/i });

    fireEvent.change(textarea, { target: { value: "Some text" } });

    expect(screen.getByText(/9 \/ 500/i)).toBeInTheDocument();

    fireEvent.click(clearBtn);

    expect(screen.getByText(/0 \/ 500/i)).toBeInTheDocument();
  });
});
