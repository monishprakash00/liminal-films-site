import { motion } from "framer-motion";

export function About() {
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="about" className="py-40 bg-background relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-serif leading-tight text-foreground border-l-4 border-accent pl-6 py-2"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              "We believe cinema is not just seen, it is <span className="text-accent italic">felt</span>. Every frame is a canvas of emotion."
            </motion.h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-7/12 space-y-6 text-muted-foreground text-lg font-light leading-relaxed"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Born from a collective of passionate storytellers, LIMINAL FILMS was founded with a singular vision: to create cinema that lingers in the mind long after the credits roll.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We are an independent production house operating at the intersection of high art and compelling narrative. Whether it's a slow-burn feature film or a pulse-pounding web series, we approach every project with the exact same rigor, treating light, shadow, and sound as our primary dialogue.
            </motion.p>
            <motion.p 
              className="text-accent uppercase tracking-widest text-sm font-medium pt-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Est. 2018 — Independent by Design
            </motion.p>
          </motion.div>

        </div>
        
        {/* Cinematic Divider with Animation */}
        <motion.div 
          className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent relative"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          style={{ originX: 0.5 }}
        ></motion.div>
      </div>
    </section>
  );
}
