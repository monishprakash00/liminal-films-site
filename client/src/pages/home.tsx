import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBgVideo from "@/assets/videos/hero-bg.mp4";

export default function Home() {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 5000], [0, 300]);
  const videoOpacity = useTransform(scrollY, [0, 1000], [0.6, 0.2]);

  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      {/* Fixed Native Video Background */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ y: videoY, opacity: videoOpacity }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src={heroBgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60 pointer-events-none"></div>
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
    </main>
  );
}