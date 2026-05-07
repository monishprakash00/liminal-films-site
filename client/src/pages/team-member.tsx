import { useRoute } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { team } from "@/lib/data";

export default function TeamMemberPage() {
  const [, params] = useRoute("/team/:id");
  const memberId = params?.id;
  
  const member = team.find(m => m.id === memberId);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-serif">Team member not found</h1>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen text-foreground pt-24 relative overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ y }}
      >
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover scale-[1.1] grayscale opacity-[0.07] blur-md"
        />
        <div className="absolute inset-0 bg-background/80"></div>
      </motion.div>
      
      <div className="relative z-10">
        <Navigation />

        <article className="container mx-auto px-6 md:px-12 py-20 min-h-[80vh] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-4xl mx-auto flex flex-col items-center gap-12"
          >
            <div className="w-48 h-48 md:w-[288px] md:h-[288px] rounded-full overflow-hidden shrink-0 bg-secondary shadow-2xl relative">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <img 
                src={member.image} 
                alt={member.name} 
                className={`w-full h-full object-cover grayscale ${
                  member.id === 'manas' ? 'object-[center_20%]' : ''
                }`}
              />
            </div>

            <div className="space-y-8 text-center max-w-3xl">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 whitespace-pre-line">
                  {member.role}
                </p>
                <h1 className="text-4xl md:text-6xl font-serif leading-tight">
                  {member.name}
                </h1>
              </div>

              <div className="prose prose-invert prose-lg max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground text-center">
                {member.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </article>

        <Footer />
      </div>
    </main>
  );
}