import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor } from "@/components/CustomCursor";
import Home from "@/pages/home";
import ProjectPage from "@/pages/project";
import TeamMemberPage from "@/pages/team-member";
import NotFound from "@/pages/not-found";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lenis from "lenis";

function Router() {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Custom transition variant for a cinematic feel
  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
      scale: 0.98,
      filter: "blur(10px)"
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], // Custom cinematic cubic bezier
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -40,
      scale: 1.02,
      filter: "blur(10px)",
      transition: { 
        duration: 0.8, 
        ease: [0.7, 0, 0.84, 0] 
      }
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full min-h-screen origin-top relative z-10"
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/project/:id" component={ProjectPage} />
          <Route path="/team/:id" component={TeamMemberPage} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
