import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import introVideo from "@/assets/videos/intro.mp4";

export default function Home() {
  const [introState, setIntroState] = useState<'playing' | 'fading' | 'done'>('playing');
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 5000], [0, 300]);
  const videoOpacity = useTransform(scrollY, [0, 1000], [0.4, 0.1]);

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
        <>
          {/* Fixed Native Video Background */}
          <motion.div 
            className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center bg-black"
            style={{ y: videoY, opacity: videoOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2 }}
          >
            <div className="relative w-[75vw] h-[75vh]">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-dark-32669-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_100px_black] sm:shadow-[inset_0_0_150px_150px_black]"></div>
              <div className="absolute inset-0 bg-background/60 pointer-events-none"></div>
            </div>
          </motion.div>
          
          <div className="relative z-10">
            <Navigation />
            <Hero />
            <Manifesto />
            <Portfolio />
            <Team />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}