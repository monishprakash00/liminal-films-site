import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import logo from "@/assets/images/logo.webp";
import { scrollToSection } from "@/lib/scroll-to-section";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (targetId: string, path: string) => {
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-3 md:py-4" : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative min-h-[40px]">
        <div className="hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-[0.2em] flex-1">
          <a 
            onClick={() => handleNavClick("manifesto", "/")}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Manifesto
          </a>
          <a 
            onClick={() => handleNavClick("work", "/")}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Work
          </a>
        </div>

        <a onClick={() => handleNavClick("", "/")} className="cursor-pointer">
          <div className="hover:opacity-70 transition-opacity absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center whitespace-nowrap">
            <img 
              src={logo} 
              alt="Liminal Films" 
              className="h-12 md:h-[60px] w-auto object-contain transition-all duration-500"
            />
          </div>
        </a>

        <div className="hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-[0.2em] flex-1 justify-end">
          <a 
            onClick={() => handleNavClick("team", "/")}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Team
          </a>
          <a 
            onClick={() => handleNavClick("", "/contact")}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}