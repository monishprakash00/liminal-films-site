import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlayCircle, X } from "lucide-react";

import port1 from "../assets/images/portfolio-1.png";
import port2 from "../assets/images/portfolio-2.png";
import port3 from "../assets/images/portfolio-3.png";
import port4 from "../assets/images/portfolio-4.png";

type ProjectType = "Feature Film" | "Web Series";

interface Project {
  id: number;
  title: string;
  year: string;
  type: ProjectType;
  image: string;
  synopsis: string;
  director: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Midnight Son",
    year: "2024",
    type: "Feature Film",
    image: port1,
    synopsis: "A neo-noir thriller following a disillusioned detective navigating the underbelly of a neon-drenched metropolis.",
    director: "Elena Vance",
  },
  {
    id: 2,
    title: "The Highland Echoes",
    year: "2023",
    type: "Feature Film",
    image: port2,
    synopsis: "A hauntingly beautiful drama set in the remote misty highlands, exploring themes of grief, isolation, and redemption.",
    director: "Marcus Cole",
  },
  {
    id: 3,
    title: "Neon Shadows",
    year: "2023",
    type: "Web Series",
    image: port3,
    synopsis: "An anthology series uncovering the hidden, intertwined lives of city dwellers during the darkest hours of the night.",
    director: "Sarah Jenkins",
  },
  {
    id: 4,
    title: "Solaris",
    year: "2022",
    type: "Feature Film",
    image: port4,
    synopsis: "An abstract, surreal journey of an astronaut grappling with memories brought to life by a mysterious celestial body.",
    director: "Elena Vance",
  }
];

export function Portfolio() {
  const [filter, setFilter] = useState<ProjectType | "All">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(p => filter === "All" || p.type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif text-foreground"
          >
            Selected Works
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex gap-6 text-sm uppercase tracking-widest font-medium"
          >
            {["All", "Feature Film", "Web Series"].map((cat, i) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat as ProjectType | "All")}
                className={`transition-colors duration-300 pb-1 border-b-2 relative overflow-hidden ${
                  filter === cat ? "text-accent border-accent" : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
                whileHover={{ letterSpacing: "0.05em" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="group relative cursor-pointer overflow-hidden aspect-[4/3] bg-muted"
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
              >
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute inset-0 bg-black/60 flex flex-col justify-end p-8"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.p 
                    className="text-accent text-xs uppercase tracking-widest mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.type} &bull; {project.year}
                  </motion.p>
                  <motion.h3 
                    className="text-2xl font-serif text-white"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    {project.title}
                  </motion.h3>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-card border-border p-0 rounded-none overflow-hidden gap-0">
          <DialogTitle className="sr-only">{selectedProject?.title}</DialogTitle>
          <DialogDescription className="sr-only">{selectedProject?.synopsis}</DialogDescription>
          
          <AnimatePresence>
            {selectedProject && (
              <motion.div 
                className="flex flex-col md:flex-row h-full max-h-[80vh]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="w-full md:w-3/5 relative group bg-black flex items-center justify-center min-h-[300px]"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={selectedProject.image} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PlayCircle className="w-16 h-16 text-white/80 hover:text-accent cursor-pointer transition-colors relative z-10" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="w-full md:w-2/5 p-8 md:p-12 flex flex-col bg-card"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.p 
                    className="text-accent text-xs uppercase tracking-widest mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedProject.type} &bull; {selectedProject.year}
                  </motion.p>
                  <motion.h3 
                    className="text-3xl font-serif text-foreground mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    {selectedProject.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground font-light text-sm mb-8 leading-relaxed flex-grow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedProject.synopsis}
                  </motion.p>
                  <motion.div 
                    className="pt-6 border-t border-border/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Director</p>
                    <p className="text-foreground">{selectedProject.director}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
