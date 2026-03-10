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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row gap-16 md:gap-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-serif text-foreground mb-6"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              Let's Create<br/>Something Real.
            </motion.h2>
            <motion.p 
              className="text-muted-foreground font-light mb-12 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Whether you have a fully fleshed script or just the seed of an idea, we want to hear from you.
            </motion.p>

            <motion.div 
              className="flex gap-6 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              className="pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm font-medium text-foreground mb-2">AUTEUR STUDIOS</p>
              <p className="text-sm text-muted-foreground">104 Cinematic Way, Suite 400</p>
              <p className="text-sm text-muted-foreground">Los Angeles, CA 90028</p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2 bg-card/50 border border-border p-8 md:p-12"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <Input 
                    required 
                    className="rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input 
                    type="email" 
                    required 
                    className="rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-accent"
                  />
                </motion.div>
              </div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
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
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
              >
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea 
                  required 
                  className="min-h-[120px] rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-accent resize-none"
                />
              </motion.div>

              <motion.div 
                className="flex items-center space-x-2 pt-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Checkbox id="newsletter" className="rounded-none border-border data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground" />
                <label htmlFor="newsletter" className="text-sm text-muted-foreground font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Subscribe to our quarterly dispatch.
                </label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
              >
                <Button 
                  type="submit" 
                  className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground py-6 uppercase tracking-widest text-xs transition-colors duration-300 mt-4"
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.02, letterSpacing: "0.1em" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Inquiry
                  </motion.button>
                </Button>
              </motion.div>
            </form>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
