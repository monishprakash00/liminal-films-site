/**
 * Scrolls to a section by id, retrying until the element exists.
 *
 * Sections on the home page mount behind a framer-motion fade, so a fixed
 * timeout is unreliable — it either fires before the node exists (and silently
 * does nothing) or waits longer than it needs to. This polls instead.
 */
export function scrollToSection(id: string, timeoutMs = 3000) {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const start = performance.now();

  const attempt = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (performance.now() - start < timeoutMs) {
      requestAnimationFrame(attempt);
    }
  };

  requestAnimationFrame(attempt);
}

/** Reads a section id from a location hash, e.g. "#work" -> "work". */
export function sectionFromHash(hash: string): string {
  return hash.replace(/^#/, "").trim();
}
