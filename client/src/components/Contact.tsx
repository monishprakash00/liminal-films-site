import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Received",
      description: "We will be in touch shortly.",
      className: "border-accent bg-card text-foreground rounded-none",
    });
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Let's Create<br/>Something Real.</h2>
            <p className="text-muted-foreground font-light mb-12 max-w-md">
              Whether you have a fully fleshed script or just the seed of an idea, we want to hear from you.
            </p>

            <div className="flex gap-6 mb-12">
              {[Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            
            <div className="pt-8 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">AUTEUR STUDIOS</p>
              <p className="text-sm text-muted-foreground">104 Cinematic Way, Suite 400</p>
              <p className="text-sm text-muted-foreground">Los Angeles, CA 90028</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 bg-card/50 border border-border p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <Input required className="rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input type="email" required className="rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Project Type</label>
                <Select required>
                  <SelectTrigger className="rounded-none border-border bg-transparent focus:ring-1 focus:ring-accent">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-border bg-card">
                    <SelectItem value="feature">Feature Film</SelectItem>
                    <SelectItem value="web">Web Series</SelectItem>
                    <SelectItem value="commercial">Commercial / Branded</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea required className="min-h-[120px] rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-accent resize-none" />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="newsletter" className="rounded-none border-border data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground" />
                <label htmlFor="newsletter" className="text-sm text-muted-foreground font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Subscribe to our quarterly dispatch.
                </label>
              </div>

              <Button type="submit" className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground py-6 uppercase tracking-widest text-xs transition-colors duration-300 mt-4">
                Submit Inquiry
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
