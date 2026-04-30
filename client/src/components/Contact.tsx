import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} id="contact" className="py-40 relative z-10">
      <motion.div className="container mx-auto px-6 md:px-12 text-center max-w-2xl" style={{ y }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Contact
          </h2>

          <div className="space-y-6">
            <a 
              href="mailto:monish@liminalfilms.in" 
              className="block text-2xl md:text-4xl font-serif text-foreground hover:text-primary transition-colors duration-500"
            >
              monish@liminalfilms.in
            </a>
            
            <div className="flex items-center justify-center gap-8 pt-8">
              <a 
                href="#" 
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                YouTube
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}