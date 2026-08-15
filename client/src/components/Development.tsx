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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-16">
          {development.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.12 }}
              className="h-full"
            >
              <Link href={`/development/${project.id}`}>
                <a className="group flex h-full flex-col border-t border-border/50 pt-8 cursor-pointer">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-5">
                    {project.genre}
                  </p>

                  <h3 className="text-2xl lg:text-3xl font-light tracking-wide leading-tight mb-6 group-hover:opacity-60 transition-opacity duration-500">
                    {project.title}
                  </h3>

                  <p className="text-sm font-light leading-relaxed text-muted-foreground mb-10">
                    {project.logline}
                  </p>

                  <p className="mt-auto text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
                    {project.stage}
                  </p>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
