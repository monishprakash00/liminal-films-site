import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-12 relative z-10 border-t border-border/20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span>LIMINAL FILMS</span>
          <span className="hidden md:inline">·</span>
          <span>© {new Date().getFullYear()}</span>
        </motion.div>
      </div>
    </footer>
  );
}