import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import logo from "@assets/Lone_Tree_white_1777612235352.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-4 md:py-6" : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-3 items-center">
        <div className="hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-[0.2em] justify-start">
          <a 
            href={isHomePage ? "#manifesto" : "/"} 
            onClick={(e) => handleNavClick(e, "manifesto")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Manifesto
          </a>
          <a 
            href={isHomePage ? "#work" : "/"} 
            onClick={(e) => handleNavClick(e, "work")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Work
          </a>
        </div>

        <Link href="/" className="flex justify-center col-span-3 md:col-span-1">
          <div className="cursor-pointer hover:opacity-70 transition-opacity">
            <img 
              src={logo} 
              alt="Liminal Films" 
              className="h-16 md:h-20 w-auto object-contain transition-all duration-500"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-[0.2em] justify-end">
          <a 
            href={isHomePage ? "#team" : "/"} 
            onClick={(e) => handleNavClick(e, "team")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Team
          </a>
          <a 
            href={isHomePage ? "#contact" : "/"} 
            onClick={(e) => handleNavClick(e, "contact")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}