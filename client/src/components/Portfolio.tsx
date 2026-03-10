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

  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif text-foreground"
          >
            Selected Works
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 text-sm uppercase tracking-widest font-medium"
          >
            {["All", "Feature Film", "Web Series"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as ProjectType | "All")}
                className={`transition-colors duration-300 pb-1 border-b-2 ${
                  filter === cat ? "text-accent border-accent" : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="group relative cursor-pointer overflow-hidden aspect-[4/3] bg-muted"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <p className="text-accent text-xs uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.type} &bull; {project.year}</p>
                  <h3 className="text-2xl font-serif text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-card border-border p-0 rounded-none overflow-hidden gap-0">
          <DialogTitle className="sr-only">{selectedProject?.title}</DialogTitle>
          <DialogDescription className="sr-only">{selectedProject?.synopsis}</DialogDescription>
          
          {selectedProject && (
            <div className="flex flex-col md:flex-row h-full max-h-[80vh]">
              <div className="w-full md:w-3/5 relative group bg-black flex items-center justify-center min-h-[300px]">
                <img src={selectedProject.image} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <PlayCircle className="w-16 h-16 text-white/80 hover:text-accent cursor-pointer transition-colors relative z-10" />
              </div>
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col bg-card">
                <p className="text-accent text-xs uppercase tracking-widest mb-4">{selectedProject.type} &bull; {selectedProject.year}</p>
                <h3 className="text-3xl font-serif text-foreground mb-6">{selectedProject.title}</h3>
                <p className="text-muted-foreground font-light text-sm mb-8 leading-relaxed flex-grow">
                  {selectedProject.synopsis}
                </p>
                <div className="pt-6 border-t border-border/50">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Director</p>
                  <p className="text-foreground">{selectedProject.director}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
