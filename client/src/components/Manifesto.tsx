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
        className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10"
        style={{ y, opacity }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-12"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-relaxed md:leading-relaxed font-light">
            Some films end when the credits roll. These do not. LIMINAL FILMS makes work that lives in the body — in the silence after, in the questions that follow you home. 
          </h2>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-relaxed md:leading-relaxed font-light">
            Every story is a threshold. Every frame, a passage. You enter one person. You leave another. That is the only measure that matters.
          </h2>
        </motion.div>
      </motion.div>
    </section>
  );
}