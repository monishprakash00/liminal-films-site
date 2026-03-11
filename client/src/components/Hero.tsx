import { motion } from "framer-motion";
import heroBg from "../assets/images/hero-bg.png";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <img 
          src={heroBg} 
          alt="Cinematic background" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex items-center justify-start py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          {/* Main Heading */}
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-tight leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Shaped by <br/>
            <motion.span 
              className="text-accent italic"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Artists.
            </motion.span>
          </motion.h1>

          {/* Secondary Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-muted-foreground tracking-tight leading-tight"
          >
            Built Around Story. <br/>
            <span className="text-accent italic">Realised Through Image & Sound.</span>
          </motion.h2>

          {/* Descriptive Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-muted-foreground/80 font-light leading-relaxed max-w-xl"
          >
            An independent production house exploring the narrative across different visual mediums.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <Button 
              asChild 
              variant="outline" 
              className="rounded-none border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-xs uppercase tracking-widest transition-all duration-500 relative overflow-hidden"
            >
              <motion.a 
                href="#work"
                className="relative"
                whileHover={{ letterSpacing: "0.08em" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View Our Work</span>
                <motion.div
                  className="absolute inset-0 bg-accent/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 right-12 z-10 text-muted-foreground"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
      >
        <a href="#about" aria-label="Scroll down" className="block">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </a>
      </motion.div>

      {/* Decorative Line */}
      <motion.div
        className="absolute left-0 top-1/2 w-1 h-24 bg-gradient-to-b from-transparent via-accent to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        style={{ originY: 0.5 }}
      />
    </section>
  );
}
