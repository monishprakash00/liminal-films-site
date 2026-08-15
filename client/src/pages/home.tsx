import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Development } from "@/components/Development";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useMeta } from "@/hooks/use-meta";
import { scrollToSection, sectionFromHash } from "@/lib/scroll-to-section";

export default function Home() {
  useMeta({
    title: "Liminal Films | Independent Production House",
    description:
      "Shaped by artists and built around story. Realised through image and sound. An independent production house based in Bangalore, India.",
    path: "/",
  });

  // Arriving with a hash (from another page, or a shared link): position the
  // page on that section *before the browser paints*, so it fades in already
  // there rather than showing the hero and then jumping.
  useLayoutEffect(() => {
    const target = sectionFromHash(window.location.hash);
    if (target) scrollToSection(target);
  }, []);

  // Hash changing while already here is an in-page jump — animate it.
  useEffect(() => {
    const onHashChange = () => {
      const target = sectionFromHash(window.location.hash);
      if (target) scrollToSection(target, { smooth: true });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <main className="min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden bg-transparent">
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <Navigation />
        <Hero />
        <Manifesto />
        <Portfolio />
        <Development />
        <Team />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  );
}