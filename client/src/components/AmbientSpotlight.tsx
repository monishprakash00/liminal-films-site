import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

export function AmbientSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [location] = useLocation();

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
        spotlightRef.current.style.background = `
          radial-gradient(circle 1125px at ${currentX}px ${currentY}px, rgba(200, 215, 235, 0.08) 0%, transparent 50%),
          radial-gradient(circle 800px at ${window.innerWidth - currentX}px ${window.innerHeight - currentY}px, rgba(150, 170, 200, 0.04) 0%, transparent 60%)
        `;
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
