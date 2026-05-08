import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

export function AmbientSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    if (location !== "/") {
      setIsVisible(true);
    }
  }, [location]);

  useEffect(() => {
    const handleIntroDone = () => setIsVisible(true);
    window.addEventListener("intro-done", handleIntroDone);
    
    // Also trigger if it was already played (handled by Home unmounting/remounting)
    return () => window.removeEventListener("intro-done", handleIntroDone);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smooth easing
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(circle 1125px at ${currentX}px ${currentY}px, rgba(255, 255, 255, 0.075) 0%, transparent 50%)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={spotlightRef}
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
