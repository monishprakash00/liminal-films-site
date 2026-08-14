/**
 * Scrolls to a section by id.
 *
 * Cross-page navigation is the hard case. The router runs AnimatePresence in
 * "wait" mode, so the outgoing page finishes a 0.5s exit before the incoming
 * page mounts, and the incoming page then animates from y:20 to y:0. On top of
 * that, images settle in and shift layout underneath. A single scrollIntoView
 * fired at mount lands in the wrong place or gets undone entirely.
 *
 * So: poll until the node exists, let the enter transition finish, jump to it,
 * then keep correcting for a short window while layout settles. Any real user
 * scroll input cancels the correction immediately.
 */

const HEADER_OFFSET = 96; // matches scroll-margin-top: 6rem on section[id]

interface Options {
  /** Smooth for in-page jumps; instant when arriving from another page. */
  smooth?: boolean;
  /** How long to keep looking for the node. */
  findTimeoutMs?: number;
  /** How long to keep correcting position after the first scroll. */
  settleMs?: number;
  /** Delay after the node appears, to let the page transition finish. */
  transitionMs?: number;
}

export function scrollToSection(id: string, options: Options = {}) {
  const {
    smooth = false,
    findTimeoutMs = 4000,
    settleMs = 1000,
    transitionMs = 550,
  } = options;

  if (!id) {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    return;
  }

  const started = performance.now();
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
    removeListeners();
  };

  const removeListeners = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", onKey);
  };

  const onKey = (e: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
      cancel();
    }
  };

  const position = (el: HTMLElement) =>
    window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET;

  const findNode = () => {
    if (cancelled) return;

    const el = document.getElementById(id);
    if (el) {
      // Node is mounted, but the page may still be mid-transition. Wait it out.
      window.setTimeout(() => {
        if (cancelled) return;

        const target = document.getElementById(id);
        if (!target) return;

        window.scrollTo({ top: position(target), behavior: smooth ? "smooth" : "auto" });

        // Listen only after the initial scroll, so we don't cancel on our own.
        window.addEventListener("wheel", cancel, { passive: true });
        window.addEventListener("touchstart", cancel, { passive: true });
        window.addEventListener("keydown", onKey);

        const settleStart = performance.now();
        const correct = () => {
          if (cancelled) return;

          const node = document.getElementById(id);
          if (node) {
            const drift = node.getBoundingClientRect().top - HEADER_OFFSET;
            // Images loading in above the section push it down — nudge back.
            if (Math.abs(drift) > 4) {
              window.scrollTo({ top: position(node), behavior: "auto" });
            }
          }

          if (performance.now() - settleStart < settleMs) {
            requestAnimationFrame(correct);
          } else {
            removeListeners();
          }
        };
        requestAnimationFrame(correct);
      }, transitionMs);
      return;
    }

    if (performance.now() - started < findTimeoutMs) {
      requestAnimationFrame(findNode);
    }
  };

  requestAnimationFrame(findNode);
}

/** Reads a section id from a location hash, e.g. "#work" -> "work". */
export function sectionFromHash(hash: string): string {
  return hash.replace(/^#/, "").trim();
}
