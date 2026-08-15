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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {development.map((project, i) => (
            <Link key={project.id} href={`/development/${project.id}`}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group relative cursor-pointer overflow-hidden block aspect-[4/5] bg-white/[0.02] shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] hover:-translate-y-2 transition-all duration-700"
              >
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2">
                    {project.format}
                  </p>
                  <h3 className="text-2xl font-serif text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/70 font-serif italic mt-1 text-sm">
                    {project.genre}
                  </p>
                  <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-5 pt-5 border-t border-white/10">
                    {project.stage}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
