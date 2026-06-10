import { useEffect, useRef } from "react";

interface BokehParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  opacity: number;
  blurFalloff: number;
  wobbleAngle: number;
  wobbleSpeed: number;
}

export function BokehBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: BokehParticle[] = [];

    // Warm, cinematic colors: Amber, Burnt Orange, Soft Gold, Deep Rust
    const colors = [
      "218, 112, 18",  // Golden rod
      "189, 78, 20",   // Rust/Orange
      "224, 143, 62",  // Soft Amber
      "166, 56, 17",   // Deep Burnt Orange
      "230, 170, 100"  // Soft Champagne
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor(window.innerWidth / 40); 
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 250 + 20, // Huge variety in size (20px to 270px)
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: (Math.random() - 0.5) * 0.6, // Random up/down drift
          speedX: (Math.random() - 0.5) * 0.6, // Random left/right drift
          opacity: Math.random() * 0.12 + 0.03, // 3% to 15% opacity (slightly subtler)
          blurFalloff: Math.random() * 0.7 + 0.1, // Random blurriness (sharp core vs soft edge)
          wobbleAngle: Math.random() * Math.PI * 2,
          wobbleSpeed: (Math.random() - 0.5) * 0.02 // Random wandering motion
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Complex wandering motion
        p.wobbleAngle += p.wobbleSpeed;
        p.y += p.speedY + Math.sin(p.wobbleAngle) * 0.5;
        p.x += p.speedX + Math.cos(p.wobbleAngle) * 0.5;

        // Wrap around smoothly
        if (p.y + p.size < 0) p.y = canvas.height + p.size;
        if (p.y - p.size > canvas.height) p.y = -p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;

        // Draw bokeh with varying levels of blurriness
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(${p.color}, ${p.opacity})`);
        gradient.addColorStop(p.blurFalloff, `rgba(${p.color}, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ mixBlendMode: "screen", filter: "blur(2px)" }}
    />
  );
}
