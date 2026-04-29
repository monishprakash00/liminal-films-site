import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { projects } from "@/lib/data";

export default function ProjectPage() {
  const [, params] = useRoute("/project/:id");
  const projectId = params?.id;
  
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-serif">Project not found</h1>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen text-foreground pt-24">
      {/* Global Grain Overlay */}
      <div className="grain-overlay"></div>
      
      <Navigation />

      <article className="container mx-auto px-6 md:px-12 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {project.type} · {project.year}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif leading-tight">
              {project.title}
            </h1>
          </div>

          <div className="aspect-video w-full bg-black relative">
            <iframe 
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube.com/embed/${project.videoId}`} 
              title={project.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground">
            <p>{project.synopsis}</p>
          </div>
        </motion.div>
      </article>

      <Footer />
    </main>
  );
}