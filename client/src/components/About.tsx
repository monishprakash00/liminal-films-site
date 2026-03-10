import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12"
          >
            <h2 className="text-3xl md:text-5xl font-serif leading-tight text-foreground border-l-4 border-accent pl-6 py-2">
              "We believe cinema is not just seen, it is <span className="text-accent italic">felt</span>. Every frame is a canvas of emotion."
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12 space-y-6 text-muted-foreground text-lg font-light leading-relaxed"
          >
            <p>
              Born from a collective of passionate storytellers, AUTEUR was founded with a singular vision: to create cinema that lingers in the mind long after the credits roll.
            </p>
            <p>
              We are an independent production house operating at the intersection of high art and compelling narrative. Whether it's a slow-burn feature film or a pulse-pounding web series, we approach every project with the exact same rigor, treating light, shadow, and sound as our primary dialogue.
            </p>
            <p className="text-accent uppercase tracking-widest text-sm font-medium pt-4">
              Est. 2018 — Independent by Design
            </p>
          </motion.div>

        </div>
        
        {/* Cinematic Divider */}
        <div className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>
    </section>
  );
}
