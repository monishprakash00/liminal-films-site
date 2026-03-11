import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import filmmakingBg from "@/assets/images/filmmaking-bg.png";

export default function Home() {
  return (
    <main className="bg-background min-h-screen relative" style={{ backgroundImage: `url(${filmmakingBg})`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
      {/* Global Grain Overlay */}
      <div className="grain-overlay"></div>
      <div className="absolute inset-0 bg-background/40 pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Portfolio />
        <Team />
        <Contact />
      </div>
      
      <footer className="py-8 text-center border-t border-border bg-background relative z-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          &copy; {new Date().getFullYear()} Liminal Films. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
