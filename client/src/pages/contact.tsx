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
    <div className="bg-background min-h-screen text-foreground pt-24 px-6 md:px-12 flex flex-col items-center justify-center">
      <Link href="/" className="absolute top-8 left-6 md:left-12 z-50 group flex items-center gap-2">
        <motion.div 
          className="w-8 h-[1px] bg-foreground/50 group-hover:w-12 group-hover:bg-foreground transition-all duration-500"
        />
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-500">
          Back
        </span>
      </Link>

      <motion.div 
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-display tracking-[0.1em] font-light text-foreground uppercase mb-4">
            Get in touch
          </h1>
          <p className="text-sm md:text-base text-muted-foreground/80 font-sub tracking-[0.2em] uppercase">
            We would love to hear from you
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            className="text-center py-20 border border-foreground/10 p-12 bg-black/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-2xl font-serif mb-4">Thank you</h3>
            <p className="text-muted-foreground/80 uppercase tracking-[0.1em] text-sm">
              We have received your message and will be in touch shortly.
            </p>
            <Button 
              variant="outline" 
              className="mt-8 rounded-none border-foreground/20 hover:bg-foreground/5"
              onClick={() => setIsSubmitted(false)}
            >
              SEND ANOTHER
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</label>
              <Input 
                id="name" 
                required 
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                placeholder="YOUR NAME"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Subject</label>
              <Input 
                id="subject" 
                required 
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                placeholder="WHAT IS THIS ABOUT?"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label>
              <Textarea 
                id="message" 
                required 
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors min-h-[150px] resize-none"
                placeholder="YOUR MESSAGE..."
              />
            </div>
            
            <div className="pt-8 text-center">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-12 py-6 uppercase tracking-[0.2em] text-xs transition-all duration-300"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
