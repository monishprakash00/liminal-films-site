import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useLocation } from "wouter";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [location] = useLocation();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Rotate the reel as the mouse moves across the screen
  const rotate = useTransform(cursorXSpring, (x) => x * 0.5);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('project-card');
        
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateHoverState);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference text-white hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        rotate,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" fill="transparent" stroke="currentColor" strokeWidth="5">
        <circle cx="50" cy="50" r="46" />
        <circle cx="50" cy="50" r="16" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        
        <line x1="50" y1="4" x2="50" y2="34" />
        <line x1="50" y1="66" x2="50" y2="96" />
        <line x1="4" y1="50" x2="34" y2="50" />
        <line x1="66" y1="50" x2="96" y2="50" />
        
        <line x1="17.5" y1="17.5" x2="38.7" y2="38.7" />
        <line x1="82.5" y1="82.5" x2="61.3" y2="61.3" />
        <line x1="17.5" y1="82.5" x2="38.7" y2="61.3" />
        <line x1="82.5" y1="17.5" x2="61.3" y2="38.7" />
      </svg>
    </motion.div>
  );
}