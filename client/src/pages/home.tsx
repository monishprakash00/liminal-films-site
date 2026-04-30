import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative">
      {/* Fixed YouTube Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <iframe 
          className="w-full h-full scale-[1.5]"
          src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&controls=0&loop=1&playlist=ScMzIvxBSi4&playsinline=1&rel=0&showinfo=0&modestbranding=1" 
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-background/60"></div>
      </div>
      
      {/* Global Grain Overlay */}
      <div className="grain-overlay"></div>
      
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