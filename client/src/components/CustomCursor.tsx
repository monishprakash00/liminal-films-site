import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we're hovering over a clickable element or something we want to emphasize
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

    if (!isTouchDevice) {
      window.addEventListener("mousemove", updatePosition);
      window.addEventListener("mouseover", updateHoverState);
      document.body.addEventListener("mouseleave", handleMouseLeave);
      document.body.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, isTouchDevice, cursorX, cursorY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference text-primary"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 90 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
        {/* Main Solid Circle */}
        <circle cx="50" cy="50" r="45" fill="currentColor"/>
        
        {/* Center hole */}
        <circle cx="50" cy="50" r="4" fill="black" />
        
        {/* 6 small holes around center */}
        <circle cx="50" cy="41" r="3" fill="black" />
        <circle cx="57.8" cy="45.5" r="3" fill="black" />
        <circle cx="57.8" cy="54.5" r="3" fill="black" />
        <circle cx="50" cy="59" r="3" fill="black" />
        <circle cx="42.2" cy="54.5" r="3" fill="black" />
        <circle cx="42.2" cy="45.5" r="3" fill="black" />

        {/* 5 large cutouts */}
        <circle cx="50" cy="21" r="14" fill="black" />
        <circle cx="77.6" cy="41" r="14" fill="black" />
        <circle cx="67" cy="73.5" r="14" fill="black" />
        <circle cx="33" cy="73.5" r="14" fill="black" />
        <circle cx="22.4" cy="41" r="14" fill="black" />
      </svg>
    </motion.div>
  );
}