import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import introVideo from "@/assets/videos/intro2.mp4";

export default function Home() {
  const [introState, setIntroState] = useState<'playing' | 'fading' | 'done'>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('introPlayed')) {
      return 'done';
    }
    return 'playing';
  });

  useEffect(() => {
    if (introState === 'done') {
      sessionStorage.setItem('introPlayed', 'true');
    }
  }, [introState]);

  useEffect(() => {
    if (introState !== 'done') {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [introState]);

  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      <AnimatePresence>
        {introState !== 'done' && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.video 
              src={introVideo}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => setIntroState('fading')}
              initial={{ opacity: 1 }}
              animate={{ opacity: introState === 'fading' ? 0 : 1 }}
              transition={{ duration: 1.5 }}
              onAnimationComplete={(definition) => {
                if (definition.opacity === 0 && introState === 'fading') {
                  setIntroState('done');
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {introState === 'done' && (
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Navigation />
          <Hero />
          <Manifesto />
          <Portfolio />
          <Team />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}