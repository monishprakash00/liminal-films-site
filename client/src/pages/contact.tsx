import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col md:flex-row relative">
      <Link href="/" className="absolute top-8 left-6 md:left-12 z-50 group flex items-center gap-2 mix-blend-difference">
        <motion.div 
          className="w-8 h-[1px] bg-foreground/50 group-hover:w-12 group-hover:bg-foreground transition-all duration-500"
        />
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-500">
          Back
        </span>
      </Link>

      {/* Left Side - Typography & Branding */}
      <motion.div 
        className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-foreground/10 pt-32 md:pt-24"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-[100px] font-serif text-foreground leading-[0.9] mb-8">
          Get<br />
          <span className="text-muted-foreground italic">in touch</span>
        </h1>
        <p className="text-sm md:text-base text-muted-foreground/60 font-sub tracking-[0.25em] uppercase max-w-sm leading-loose">
          We collaborate with visionaries to create cinematic experiences.
        </p>
        
        <div className="mt-auto pt-24 hidden md:block">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Direct</p>
          <a href="mailto:enquiry@liminalfilms.in" className="text-xl font-serif hover:text-primary transition-colors">
            enquiry@liminalfilms.in
          </a>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-black/40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        {isSubmitted ? (
          <motion.div 
            className="flex flex-col items-center justify-center text-center h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-4xl font-serif mb-6 italic text-muted-foreground">Thank you</h3>
            <p className="text-muted-foreground/80 uppercase tracking-[0.15em] text-sm max-w-sm leading-loose">
              We have received your message and will be in touch shortly.
            </p>
            <Button 
              variant="outline" 
              className="mt-12 rounded-none border-foreground/20 hover:bg-foreground/10 hover:text-foreground text-xs tracking-[0.2em] uppercase px-8 py-6"
              onClick={() => setIsSubmitted(false)}
            >
              SEND ANOTHER
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12 max-w-md mx-auto w-full">
            <div className="space-y-3 group">
              <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-focus-within:text-foreground transition-colors">Name</label>
              <Input 
                id="name" 
                required 
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 pb-4 text-lg focus-visible:ring-0 focus-visible:border-foreground transition-colors font-serif"
                placeholder="How should we address you?"
              />
            </div>
            
            <div className="space-y-3 group">
              <label htmlFor="subject" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-focus-within:text-foreground transition-colors">Subject</label>
              <Input 
                id="subject" 
                required 
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 pb-4 text-lg focus-visible:ring-0 focus-visible:border-foreground transition-colors font-serif"
                placeholder="What is this regarding?"
              />
            </div>
            
            <div className="space-y-3 group">
              <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-focus-within:text-foreground transition-colors">Message</label>
              <Textarea 
                id="message" 
                required 
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 pb-4 text-lg focus-visible:ring-0 focus-visible:border-foreground transition-colors min-h-[120px] resize-none font-serif"
                placeholder="Tell us about your project..."
              />
            </div>
            
            <div className="pt-8">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none py-8 uppercase tracking-[0.3em] text-xs transition-all duration-500 hover:tracking-[0.4em]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
