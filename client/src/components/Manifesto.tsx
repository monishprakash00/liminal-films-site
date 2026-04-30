import { motion } from "framer-motion";

export function Manifesto() {
  return (
    <section id="manifesto" className="py-40 bg-background relative z-10 flex items-center min-h-[80vh] overflow-hidden">
      {/* YouTube Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <iframe 
          className="w-full h-full scale-[1.5]"
          src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&controls=0&loop=1&playlist=ScMzIvxBSi4&playsinline=1&rel=0&showinfo=0&modestbranding=1" 
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-background/70"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
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
      </div>
    </section>
  );
}