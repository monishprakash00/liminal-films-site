import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo.webp";
import { scrollToSection } from "@/lib/scroll-to-section";

const NAV_ITEMS: { label: string; targetId: string; path: string }[] = [
  { label: "Manifesto", targetId: "manifesto", path: "/" },
  { label: "Work", targetId: "work", path: "/" },
  { label: "Team", targetId: "team", path: "/" },
  { label: "Contact", targetId: "", path: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNavClick = (targetId: string, path: string) => {
    setIsMenuOpen(false);

    // Already on the right page — just move to the section.
    if (location === path) {
      if (targetId) {
        window.history.replaceState(null, "", `${path}#${targetId}`);
      }
      scrollToSection(targetId);
      return;
    }

    // Coming from elsewhere: record the target in the hash first, so the
    // destination page knows where to land even if this scroll is interrupted.
    if (targetId) {
      window.location.hash = targetId;
    } else {
      window.history.replaceState(null, "", path);
    }

    setLocation(path);
    scrollToSection(targetId);
  };

  const linkClass =
    "text-muted-foreground hover:text-foreground transition-colors cursor-pointer";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          isScrolled || isMenuOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-3 md:py-4"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative min-h-[40px]">
          {/* Desktop — left group */}
          <div className="hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-[0.2em] flex-1">
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <a
                key={item.label}
                onClick={() => handleNavClick(item.targetId, item.path)}
                className={linkClass}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile — menu toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="md:hidden relative z-50 w-10 h-10 -ml-2 flex flex-col items-center justify-center gap-[5px] group"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[1px] w-[22px] bg-foreground/70 group-hover:bg-foreground"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-[1px] w-[22px] bg-foreground/70 group-hover:bg-foreground"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[1px] w-[22px] bg-foreground/70 group-hover:bg-foreground"
            />
          </button>

          {/* Logo */}
          <a onClick={() => handleNavClick("", "/")} className="cursor-pointer">
            <div className="hover:opacity-70 transition-opacity absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center whitespace-nowrap">
              <img
                src={logo}
                alt="Liminal Films"
                className="h-12 md:h-[60px] w-auto object-contain transition-all duration-500"
              />
            </div>
          </a>

          {/* Desktop — right group */}
          <div className="hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-[0.2em] flex-1 justify-end">
            {NAV_ITEMS.slice(2).map((item) => (
              <a
                key={item.label}
                onClick={() => handleNavClick(item.targetId, item.path)}
                className={linkClass}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Spacer so the mobile toggle doesn't push the logo off centre */}
          <div className="md:hidden w-10" aria-hidden="true" />
        </div>
      </motion.nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-background/98 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNavClick(item.targetId, item.path)}
                  className="text-sm uppercase tracking-[0.3em] text-muted-foreground active:text-foreground transition-colors cursor-pointer py-2 px-6"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
