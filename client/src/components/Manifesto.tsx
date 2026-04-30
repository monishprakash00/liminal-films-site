import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section id="manifesto" className="py-40 relative z-10 flex items-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 150, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10"
      >
        <div className="text-center space-y-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-relaxed md:leading-relaxed font-light">
            Some films end when the credits roll. These do not. LIMINAL FILMS makes work that lives in the body — in the silence after, in the questions that follow you home. 
          </h2>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-relaxed md:leading-relaxed font-light">
            Every story is a threshold. Every frame, a passage. You enter one person. You leave another. That is the only measure that matters.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}