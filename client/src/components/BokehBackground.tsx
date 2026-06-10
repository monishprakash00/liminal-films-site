import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { projects } from "@/lib/data";

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
  const [, setLocation] = useLocation();
  const orbsContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize the 3 projects as floating orbs, starting near the center
  const projectOrbs = useRef(projects.map(p => ({
    id: p.id,
    project: p,
    x: (typeof window !== 'undefined' ? window.innerWidth : 1000) * (0.2 + Math.random() * 0.6),
    y: (typeof window !== 'undefined' ? window.innerHeight : 1000) * (0.2 + Math.random() * 0.6),
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    scale: 0.2, // Start small
    opacity: 0.15,
    blur: 20,
    isHovered: false
  })));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: BokehParticle[] = [];

    const colors = [
      "218, 112, 18",  // Golden rod
      "189, 78, 20",   // Rust/Orange
      "224, 143, 62",  // Soft Amber
      "166, 56, 17",   // Deep Burnt Orange
      "230, 170, 100"  // Soft Champagne
    ];

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let isAnyProjectHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleGlobalClick = (e: MouseEvent) => {
      // ONLY allow clicking if user is currently near the top of the page (Hero/About sections)
      const isInteractiveArea = window.scrollY < window.innerHeight * 1.5;
      if (!isInteractiveArea) return;

      // Ignore if clicking on actual links or buttons in the foreground
      if ((e.target as HTMLElement).closest('a, button, [role="button"], .cursor-pointer')) {
        return;
      }
      const clickedOrb = projectOrbs.current.find(orb => orb.isHovered);
      if (clickedOrb) {
        setLocation(`/project/${clickedOrb.id}`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleGlobalClick);

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
          size: Math.random() * 250 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: (Math.random() - 0.5) * 0.6,
          speedX: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.12 + 0.03,
          blurFalloff: Math.random() * 0.7 + 0.1,
          wobbleAngle: Math.random() * Math.PI * 2,
          wobbleSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Update project orbs
      let currentlyHovered = false;
      
      projectOrbs.current.forEach((orb, i) => {
        const dx = orb.x - mouseX;
        const dy = orb.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Hover detection via distance calculation instead of CSS :hover
        const hoverRadius = 150;
        
        // ONLY allow hovering/interaction if user is currently near the top of the page (Hero/About sections)
        const isInteractiveArea = window.scrollY < window.innerHeight * 1.5;
        
        orb.isHovered = isInteractiveArea && dist < hoverRadius;
        if (orb.isHovered) currentlyHovered = true;

        // Target values based on hover
        const targetScale = orb.isHovered ? 1 : 0.2;
        const targetOpacity = orb.isHovered ? 1 : 0.15;
        const targetBlur = orb.isHovered ? 0 : 20;

        // Smooth interpolation for elegant visual morphing
        orb.scale += (targetScale - orb.scale) * 0.08;
        orb.opacity += (targetOpacity - orb.opacity) * 0.08;
        orb.blur += (targetBlur - orb.blur) * 0.08;

        // Movement
        if (orb.isHovered) {
           // Magnetic pull: slowly draw the orb toward the cursor
           orb.x += dx * -0.03;
           orb.y += dy * -0.03;
        } else {
           // Wander randomly
           orb.x += orb.vx;
           orb.y += orb.vy;

           // Soft boundary to keep them in the center-ish space (60%)
           const marginX = canvas.width * 0.20;
           const marginY = canvas.height * 0.20;
           
           if (orb.x < marginX) orb.vx += 0.015;
           if (orb.x > canvas.width - marginX) orb.vx -= 0.015;
           if (orb.y < marginY) orb.vy += 0.015;
           if (orb.y > canvas.height - marginY) orb.vy -= 0.015;

           // Speed limit to keep motion elegant
           const maxSpeed = 0.6;
           if (orb.vx > maxSpeed) orb.vx = maxSpeed;
           if (orb.vx < -maxSpeed) orb.vx = -maxSpeed;
           if (orb.vy > maxSpeed) orb.vy = maxSpeed;
           if (orb.vy < -maxSpeed) orb.vy = -maxSpeed;
        }

        // Apply visual updates to DOM elements directly for 60fps performance
        if (orbsContainerRef.current) {
          const el = orbsContainerRef.current.children[i] as HTMLElement;
          if (el) {
            el.style.transform = `translate(${orb.x}px, ${orb.y}px) scale(${orb.scale})`;
            el.style.opacity = orb.opacity.toString();
            el.style.filter = `blur(${orb.blur}px)`;
            el.style.zIndex = orb.isHovered ? "50" : "1";
            
            const content = el.querySelector('.orb-content') as HTMLElement;
            if (content) {
              content.style.opacity = orb.isHovered ? "1" : "0";
            }
          }
        }
      });
      
      isAnyProjectHovered = currentlyHovered;

      // Draw standard background particles
      particles.forEach((p) => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If a project orb is hovered, regular particles scatter further away to give it focus
        const interactionRadius = isAnyProjectHovered ? 500 : 350; 
        const pushStrength = isAnyProjectHovered ? 0.08 : 0.04; 
        
        if (distance < interactionRadius && distance > 0) {
          const force = (interactionRadius - distance) / interactionRadius;
          const smoothForce = Math.pow(force, 2) * pushStrength;
          
          p.x += (dx / distance) * smoothForce * 100;
          p.y += (dy / distance) * smoothForce * 100;
        }

        p.wobbleAngle += p.wobbleSpeed;
        p.y += p.speedY + Math.sin(p.wobbleAngle) * 0.5;
        p.x += p.speedX + Math.cos(p.wobbleAngle) * 0.5;

        if (p.y + p.size < 0) p.y = canvas.height + p.size;
        if (p.y - p.size > canvas.height) p.y = -p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;

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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleGlobalClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [setLocation]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[-2]"
        style={{ mixBlendMode: "screen", filter: "blur(2px)" }}
      />
      
      <div 
        ref={orbsContainerRef} 
        className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      >
        {projectOrbs.current.map((orb) => (
          <div
            key={orb.id}
            className="absolute top-0 left-0 w-[400px] h-[400px] -ml-[200px] -mt-[200px] rounded-full overflow-hidden flex items-center justify-center transition-none shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-secondary"
            style={{ 
              transform: `translate(${orb.x}px, ${orb.y}px) scale(${orb.scale})`,
              opacity: orb.opacity,
              filter: `blur(${orb.blur}px)`
            }}
          >
            <img 
              src={orb.project.image} 
              alt={orb.project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen"
            />
            
            <div 
              className="orb-content absolute inset-0 bg-black/50 pointer-events-none flex flex-col items-center justify-center p-8 text-center" 
              style={{ opacity: 0, transition: "opacity 0.4s ease" }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-accent mb-2">{orb.project.year}</span>
              <h3 className="text-3xl font-serif text-white">{orb.project.title}</h3>
              <span className="text-xs uppercase tracking-[0.1em] text-white/70 mt-2">{orb.project.type}</span>
              <div className="mt-6 border border-white/30 rounded-full px-6 py-2 text-xs uppercase tracking-wider text-white">
                View Project
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
