import { useRoute, Link } from "wouter";
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
    <main className="bg-background min-h-screen text-foreground pt-32 md:pt-40 relative overflow-hidden">
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

        <article className="container mx-auto px-6 md:px-12 py-20 min-h-[80vh] flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mx-auto mb-12">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <motion.div className="w-8 h-[1px] bg-foreground/50 group-hover:w-12 group-hover:bg-foreground transition-all duration-500" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-500">Back</span>
            </Link>
          </div>

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
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  {member.role.split('\n').map((line, i) => (
                    <span key={i} className={i === 1 ? "block normal-case italic font-serif text-[14px] md:text-[16px] mt-1.5 tracking-normal text-muted-foreground/90" : "block"}>
                      {line}
                    </span>
                  ))}
                </div>
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