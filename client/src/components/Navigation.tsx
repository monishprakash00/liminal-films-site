import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import logo from "@assets/Lone_Tree_white_1777612235352.png";

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
    if (location === path) {
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setLocation(path);
    
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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