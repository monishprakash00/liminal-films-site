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

// Track if the intro has played during this session.
// This will persist while navigating between pages, but will reset on a full page refresh.
let hasIntroPlayed = false;

export default function Home() {
  const [introState, setIntroState] = useState<'playing' | 'fading' | 'done'>(() => {
    if (hasIntroPlayed) {
      return 'done';
    }
    return 'playing';
  });

  useEffect(() => {
    if (introState === 'done') {
      hasIntroPlayed = true;
    }
    if (introState === 'fading' || introState === 'done') {
      window.dispatchEvent(new Event('intro-done'));
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
    <main className="min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden bg-transparent">
      <AnimatePresence>
        {introState !== 'done' && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
              <motion.video 
                src={introVideo}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none"
                onTimeUpdate={(e) => {
                  const video = e.currentTarget;
                  // Start fading a bit earlier than the very end
                  if (video.duration - video.currentTime <= 5.0 && introState === 'playing') {
                    setIntroState('fading');
                  }
                }}
                onEnded={() => {
                  if (introState === 'playing') setIntroState('fading');
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: introState === 'fading' ? 0 : 1 }}
                transition={{ duration: 5.0 }}
                onAnimationComplete={(definition) => {
                  if (definition.opacity === 0 && introState === 'fading') {
                    setIntroState('done');
                  }
                }}
              />
          </motion.div>
        )}
      </AnimatePresence>

      {(introState === 'fading' || introState === 'done') && (
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
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