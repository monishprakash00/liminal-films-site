import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
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