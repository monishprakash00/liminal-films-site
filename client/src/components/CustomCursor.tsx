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
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] drop-shadow-xl"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 15 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Canister Body (Aluminum) */}
        <path d="M 20,35 L 20,75 A 30,12 0 0,0 80,75 L 80,35" fill="#a0a0a0" stroke="#777" strokeWidth="2"/>
        <ellipse cx="50" cy="35" rx="30" ry="12" fill="#b0b0b0" stroke="#888" strokeWidth="2"/>
        
        {/* Lid (Black plastic top) */}
        <path d="M 18,25 L 18,35 A 32,13 0 0,0 82,35 L 82,25" fill="#222" stroke="#111" strokeWidth="2"/>
        <ellipse cx="50" cy="25" rx="32" ry="13" fill="#333" stroke="#444" strokeWidth="2"/>
        
        {/* Inner lid details */}
        <ellipse cx="50" cy="25" rx="20" ry="8" fill="#222" stroke="#444" strokeWidth="1"/>
        <ellipse cx="50" cy="25" rx="5" ry="2" fill="#444" />
        
        {/* Highlight for metallic volume */}
        <path d="M 28,42 L 28,70" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 72,42 L 72,70" stroke="rgba(0,0,0,0.2)" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}