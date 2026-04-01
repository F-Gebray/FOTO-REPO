import { useEffect, useRef } from "react";

export default function useStaggeredReveal(delay = 100) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children);

    // Start hidden
    children.forEach((child) => {
      child.classList.add("opacity-0", "translate-y-6");
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("opacity-100", "translate-y-0");
              child.classList.remove("opacity-0", "translate-y-6");
            }, index * delay);
          });
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [delay]);

  return containerRef;
}
