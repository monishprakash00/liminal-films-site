import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center">
      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center h-full"
        style={{ y, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display tracking-[0.25em] font-light text-foreground mb-12 uppercase whitespace-nowrap overflow-visible"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Liminal Films
        </motion.h1>

        <motion.p 
          className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto font-sub tracking-[0.25em] uppercase leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          Shaped by artists & built around story.<br />
          Realised through image and sound.
        </motion.p>
      </motion.div>
    </section>
  );
}