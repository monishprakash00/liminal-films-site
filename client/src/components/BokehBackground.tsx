import { useEffect, useRef } from "react";

interface BokehParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  opacity: number;
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
      // Reduce number of particles for subtlety
      const numParticles = Math.floor(window.innerWidth / 50); 
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 150 + 50, // Large, soft circles (50px to 200px)
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: (Math.random() * -0.2) - 0.1, // Moving up very slowly
          speedX: (Math.random() - 0.5) * 0.2,  // Slight horizontal drift
          opacity: Math.random() * 0.04 + 0.01  // Extremely faint: 1% to 5% opacity
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update position
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around
        if (p.y + p.size < 0) p.y = canvas.height + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;

        // Draw bokeh
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(${p.color}, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(${p.color}, ${p.opacity * 0.5})`);
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
      style={{ mixBlendMode: "screen", filter: "blur(8px)" }}
    />
  );
}
