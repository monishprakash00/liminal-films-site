import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Portfolio } from "@/components/Portfolio";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden bg-transparent">
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
    </main>
  );
}