import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { projects, ProjectType } from "@/lib/data";

export function Portfolio() {
  const [filter, setFilter] = useState<ProjectType | "All">("All");

  const filteredProjects = projects.filter(p => filter === "All" || p.type === filter);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={ref} id="work" className="py-40 relative z-10">
      <motion.div className="container mx-auto px-6 md:px-12" style={{ y }}>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground"
          >
            Selected Works
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-wrap gap-8 text-xs tracking-[0.1em] uppercase font-light"
          >
            {["All", "Feature Film", "Short Film", "Music Video"].map((cat, i) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as ProjectType | "All")}
                className={`transition-colors duration-500 pb-1 relative overflow-hidden ${
                  filter === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group relative cursor-pointer overflow-hidden block aspect-[4/5] project-card"
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[0.8] sepia-[0.3] contrast-[0.9] brightness-[0.6] group-hover:brightness-[0.85] group-hover:grayscale-[0.5] transition-all duration-1000 ease-out transform group-hover:scale-105"
                  />
                  {/* Optional colour grading tint layer */}
                  {project.tint && (
                    <div className={`absolute inset-0 ${project.tint} pointer-events-none transition-opacity duration-1000 group-hover:opacity-75`}></div>
                  )}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-1000"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">
                      {project.type} · {project.year}
                    </p>
                    <h3 className="text-2xl font-serif text-white">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}