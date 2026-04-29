import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroSequence } from "@/components/IntroSequence";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      {!introComplete && <IntroSequence onComplete={handleIntroComplete} />}
      
      {/* Global Grain Overlay */}
      <div className="grain-overlay"></div>
      
      <Navigation />
      <Hero />
      <Manifesto />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}