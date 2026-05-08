import { useRoute, Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { projects } from "@/lib/data";

export default function ProjectPage() {
  const [, params] = useRoute("/project/:id");
  const projectId = params?.id;
  
  const project = projects.find(p => p.id === projectId);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-serif">Project not found</h1>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen text-foreground pt-20 relative overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ y }}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover scale-[1.1] grayscale opacity-10 blur-[2px]"
        />
        <div className="absolute inset-0 bg-background/80"></div>
      </motion.div>
      
      <div className="relative z-10">
        <Navigation />

        <article className="container mx-auto px-6 md:px-12 pt-4 pb-20">
          <div className="max-w-4xl mx-auto mb-12">
            <Link href="/#work" className="inline-flex items-center gap-2 group">
              <motion.div className="w-8 h-[1px] bg-foreground/50 group-hover:w-12 group-hover:bg-foreground transition-all duration-500" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-500">Back</span>
            </Link>
          </div>

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
              <p className="text-xl md:text-2xl font-serif italic text-muted-foreground">
                {project.genre}
              </p>
            </div>

            <div className="aspect-video w-full bg-black relative shadow-2xl">
              <iframe 
                className="w-full h-full absolute inset-0"
                src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`} 
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-center prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-8 mx-auto">
              {project.synopsis.split('\n').map((paragraph, index) => (
                paragraph.trim() ? (
                  <p key={index}>{paragraph}</p>
                ) : (
                  <div key={index} className="h-2 sm:h-4" />
                )
              ))}
            </div>
          </motion.div>
        </article>

        <Footer />
      </div>
    </main>
  );
}