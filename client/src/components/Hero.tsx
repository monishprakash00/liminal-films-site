import { motion } from "framer-motion";
import heroBg from "../assets/images/hero-bg-filmstrip.png";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <motion.div 
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src={heroBg} 
            alt="Cinematic background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/80 md:bg-background/60 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      </motion.div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-6 tracking-tight leading-none">
            Shaped by Artists. <br/>
            <span className="text-muted-foreground/75">Built Around Story.</span> <br/>
            <motion.span 
              className="text-accent italic inline-block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Realised Through Image & Sound.
            </motion.span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light tracking-wide mb-10">
            An independent production house exploring the narrative across different visual mediums.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            asChild 
            variant="outline" 
            className="rounded-none border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-xs uppercase tracking-widest transition-all duration-500 group relative overflow-hidden"
          >
            <motion.a 
              href="#work"
              className="relative"
              whileHover={{ letterSpacing: "0.05em" }}
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

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-muted-foreground"
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
    </section>
  );
}
