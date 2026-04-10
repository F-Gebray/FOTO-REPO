export function smoothScrollTo(targetId: string, duration = 900): void {
  const target = document.getElementById(targetId);
  if (!target) return;

  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  const startTime = performance.now();

  function easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  function animateScroll(currentTime: number): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);

    window.scrollTo(0, start + distance * easedProgress);

    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}
