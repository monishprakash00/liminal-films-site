import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { development } from "@/lib/data";
import { useMeta } from "@/hooks/use-meta";

export default function DevelopmentPage() {
  const [, params] = useRoute("/development/:id");
  const [, setLocation] = useLocation();
  const projectId = params?.id;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocation("/#development");
  };

  const project = development.find((p) => p.id === projectId);

  useMeta({
    title: project
      ? `${project.title} | Liminal Films`
      : "In Development | Liminal Films",
    description: project
      ? `${project.genre}. ${project.logline.replace(/\s+/g, " ").trim().slice(0, 150)}`
      : "Projects in development at Liminal Films.",
    path: `/development/${projectId ?? ""}`,
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-serif">Project not found</h1>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen text-foreground pt-20 relative overflow-hidden">
      <div className="relative z-10">
        <Navigation />

        <article className="container mx-auto px-6 md:px-12 pt-4 pb-20">
          <div className="max-w-4xl mx-auto mb-12">
            <a
              href="/#development"
              onClick={handleBack}
              className="inline-flex items-center gap-2 group"
            >
              <motion.div className="w-8 h-[1px] bg-foreground/50 group-hover:w-12 group-hover:bg-foreground transition-all duration-500" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                Back
              </span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center space-y-4 mb-16">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                In Development
              </p>
              <h1 className="text-4xl md:text-6xl font-light tracking-wide">
                {project.title}
              </h1>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {project.format} &nbsp;·&nbsp; {project.genre}
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-16">
              <p className="text-lg md:text-xl font-light leading-relaxed text-center text-foreground/90">
                {project.logline}
              </p>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-center prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-8 mx-auto">
              {project.synopsis.split("\n").map((paragraph, index) =>
                paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
              )}
            </div>

            <div className="max-w-2xl mx-auto mt-20 pt-12 border-t border-border/60 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
                Available Materials
              </p>
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
                {project.materials.map((item) => (
                  <li
                    key={item}
                    className="text-sm font-light text-foreground/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 mb-12">
                {project.stage}
              </p>

              <p className="text-sm font-light leading-relaxed text-muted-foreground mb-6">
                Materials available on request.
              </p>
              <a
                href="mailto:monish@liminalfilms.in"
                className="inline-block text-xs tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground border-b border-foreground/30 hover:border-foreground pb-1 transition-colors duration-500"
              >
                monish@liminalfilms.in
              </a>
            </div>
          </motion.div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
