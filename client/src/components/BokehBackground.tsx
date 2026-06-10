import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";

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
  const [location, setLocation] = useLocation();
  const orbsContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize the 3 projects as floating orbs, starting spread out
  const projectOrbs = useRef(projects.map((p, index) => {
    // Distinct starting zones (Top-left, Top-right, Bottom-center) to prevent clumping
    const zones = [
      { x: 0.25, y: 0.35 },
      { x: 0.75, y: 0.35 },
      { x: 0.50, y: 0.65 }
    ];
    const zone = zones[index % zones.length];

    return {
      id: p.id,
      project: p,
      x: (typeof window !== 'undefined' ? window.innerWidth : 1000) * (zone.x + (Math.random() - 0.5) * 0.1),
      y: (typeof window !== 'undefined' ? window.innerHeight : 1000) * (zone.y + (Math.random() - 0.5) * 0.1),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      scale: 0.2, // Start small
      opacity: 0.15,
      blur: 20,
      isHovered: false
    };
  }));

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

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let isAnyProjectHovered = false;

    const checkInteractiveArea = (x: number, y: number) => {
      if (location === '/') {
        let interactive = true;
        
        // Exclude Team section so orbs don't block team member interactions
        const teamEl = document.getElementById('team');
        if (teamEl) {
          const tRect = teamEl.getBoundingClientRect();
          if (y > tRect.top && y < tRect.bottom) {
            interactive = false;
          }
        }
        
        // Exclude Contact text area to allow clicking the email link
        const contactEl = document.getElementById('contact-content');
        if (contactEl) {
          const cRect = contactEl.getBoundingClientRect();
          // Wider margins to encompass "CONTACT", email link, and Instagram comfortably
          if (x > cRect.left - 150 && x < cRect.right + 150 && 
              y > cRect.top - 120 && y < cRect.bottom + 120) {
            interactive = false;
          }
        }
        
        // Exclude Portfolio/Selected Works section so orbs don't block project tiles
        const portfolioEl = document.getElementById('work');
        if (portfolioEl) {
          const pRect = portfolioEl.getBoundingClientRect();
          if (y > pRect.top && y < pRect.bottom) {
            interactive = false;
          }
        }
        
        return interactive;
      } else if (location === '/contact') {
        // Allow orbs to interact freely across the entire contact page
        // so it senses the cursor smoothly just like the hero page.
        return true;
      } else if (location.startsWith('/project/')) {
        // Disable orb interactions on the Project Details pages
        return false;
      }
      return false; // Disable on any other unspecified pages
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleGlobalClick = (e: MouseEvent) => {
      if (!checkInteractiveArea(e.clientX, e.clientY)) return;

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

      // Find which orb is closest to mouse (only allow ONE to be hovered)
      let closestHoverIndex = -1;
      let minDistance = 250; // Increased hover radius to make sensing cursor much more responsive

      const isInteractiveArea = checkInteractiveArea(mouseX, mouseY);

      projectOrbs.current.forEach((orb, i) => {
        const dx = orb.x - mouseX;
        const dy = orb.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isInteractiveArea && dist < minDistance) {
          minDistance = dist;
          closestHoverIndex = i;
        }
      });

      let currentlyHovered = closestHoverIndex !== -1;
      
      projectOrbs.current.forEach((orb, i) => {
        const dx = orb.x - mouseX;
        const dy = orb.y - mouseY;
        
        orb.isHovered = (i === closestHoverIndex);

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
  }, [location, setLocation]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
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
              className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen text-transparent"
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
    </motion.div>
  );
}
