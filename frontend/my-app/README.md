# Modern Frontend Portfolio — React 19 & Tailwind v4

A high-performance, accessible portfolio built to showcase modern frontend engineering patterns, modular architecture, and the latest React ecosystem features.

---

## 🛠️ The Tech Stack (2026 Standard)

This project is built using the latest stable releases to ensure maximum performance and developer experience:

- **React 19** – Utilizing the new `useActionState` for native form handling and improved `ref` patterns.
- **Tailwind CSS v4** – Leveraging the high-performance engine and zero-runtime CSS variables.
- **Vite 7** – Optimized build tooling for near-instant HMR (Hot Module Replacement).
- **Vitest** – A modern testing framework used for component-level unit and integration testing.
- **EmailJS** – Serverless contact form integration.
- **Lucide & React Icons** – Consistent, accessible iconography.

---

## ✨ Key Features & Engineering Patterns

- **Native React 19 Forms**: Implemented the `useActionState` hook for robust, pending-state-aware contact form handling without external state libraries.
- **Modular Component Architecture**: Decoupled UI components (`Button`, `Pill`, `Stat`) designed for reusability and consistent design language.
- **Glassmorphism & Modern UI**: A responsive, dark-themed interface featuring blurred navigation, radial gradients, and fluid typography.
- **Performance Optimized**: Achieved through Tailwind v4's small CSS footprint and Vite's lightning-fast asset pipeline.
- **Accessible & Semantic**: Built with proper ARIA roles, keyboard navigation (`tabIndex`), and screen-reader-friendly SVG components.

---

## 🧪 Testing & Quality Assurance

This project prioritizes reliability over "just looks." I use **Vitest** and **React Testing Library** for:

- **Component Verification**: Ensuring buttons, links, and data-driven stats render correctly.
- **Functional Testing**: Verifying the `scrollToSection` utility and form submission states.
- **Logic Tests**: Testing the custom `useActionState` logic for successful and failed email dispatches.

Run the test suite:

```bash
npm test

```
