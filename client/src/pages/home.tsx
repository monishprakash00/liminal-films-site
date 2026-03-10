import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      {/* Global Grain Overlay */}
      <div className="grain-overlay"></div>
      
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Team />
      <Contact />
      
      <footer className="py-8 text-center border-t border-border bg-background relative z-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          &copy; {new Date().getFullYear()} Auteur Studios. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
