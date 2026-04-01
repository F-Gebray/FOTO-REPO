export function smoothScrollTo(targetId, duration = 900) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  const startTime = performance.now();

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function animateScroll(currentTime) {
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
