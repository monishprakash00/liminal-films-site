import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor } from "@/components/CustomCursor";
import { AmbientSpotlight } from "@/components/AmbientSpotlight";
import { BokehBackground } from "@/components/BokehBackground";
import { AnimatePresence, motion } from "framer-motion";
import Home from "@/pages/home";
import ProjectPage from "@/pages/project";
import TeamMemberPage from "@/pages/team-member";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function Router() {
  const [location] = useLocation();
  
  return (
    <div className="w-full min-h-screen relative z-10">
      <AnimatePresence mode="wait">
        <Switch location={location} key={location}>
          <Route path="/">
            <PageWrapper><Home /></PageWrapper>
          </Route>
          <Route path="/project/:id">
            {(params) => <PageWrapper><ProjectPage params={params} /></PageWrapper>}
          </Route>
          <Route path="/team/:id">
            {(params) => <PageWrapper><TeamMemberPage params={params} /></PageWrapper>}
          </Route>
          <Route path="/contact">
            <PageWrapper><ContactPage /></PageWrapper>
          </Route>
          <Route>
            <PageWrapper><NotFound /></PageWrapper>
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BokehBackground />
        <AmbientSpotlight />
        <CustomCursor />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
