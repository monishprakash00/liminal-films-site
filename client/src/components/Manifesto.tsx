import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} id="manifesto" className="py-40 relative z-10 flex items-center min-h-[80vh]">
      <motion.div 
        className="container mx-auto px-6 md:px-8 max-w-[95rem] relative z-10"
        style={{ y, opacity }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-10"
        >
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed font-light tracking-wide"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.3)" }}
          >
            LIMINAL FILMS makes work that is grounded, human, and uncompromising.
          </h2>
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed font-light tracking-wide"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.3)" }}
          >
            We believe the best work comes from genuine collaboration and an unrelenting commitment to story.
          </h2>
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed font-light tracking-wide max-w-6xl mx-auto"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.3)" }}
          >
            Liminal means a threshold. The point beyond which you are no longer the same person. That's what we're trying to make. Work that changes you.
          </h2>
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed font-light tracking-wide max-w-6xl mx-auto"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.3)" }}
          >
            The kind that stays long after it's over.
          </h2>
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed font-light tracking-wide max-w-6xl mx-auto"
            style={{ textShadow: "0px 1px 3px rgba(0,0,0,0.3)" }}
          >
            Every story is a threshold. Every frame, a passage. You enter one person. You leave another. That is the only measure that matters.
          </h2>
        </motion.div>
      </motion.div>
    </section>
  );
}