import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { development } from "@/lib/data";

export function Development() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  if (development.length === 0) return null;

  return (
    <section ref={ref} id="development" className="py-40 relative z-10">
      <motion.div className="container mx-auto px-6 md:px-12" style={{ y }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-20"
        >
          In Development
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {development.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
            >
              <Link href={`/development/${project.id}`}>
                <a className="group block border-t border-border/60 pt-8 cursor-pointer">
                  <div className="flex items-baseline justify-between gap-6 mb-5">
                    <h3 className="text-2xl md:text-3xl font-light tracking-wide group-hover:opacity-70 transition-opacity">
                      {project.title}
                    </h3>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
                      {project.format}
                    </span>
                  </div>

                  <p className="text-sm font-light leading-relaxed text-muted-foreground mb-6 max-w-xl">
                    {project.logline}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">
                    <span>{project.genre}</span>
                    <span>{project.stage}</span>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
