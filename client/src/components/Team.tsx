import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { team } from "@/lib/data";

export function Team() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} id="team" className="py-40 relative z-10">
      <motion.div className="container mx-auto px-6 md:px-12" style={{ y }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center">
            The Team
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-12 max-w-7xl mx-auto">
          {/* Head of Team - Top Row */}
          <div className="flex justify-center w-full">
            {team
              .filter(member => member.id === 'monish')
              .map((member, index) => (
                <Link key={member.id} href={`/team/${member.id}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center group cursor-pointer w-40 md:w-56 lg:w-64"
                  >
                    <div className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden mb-6 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-md group-hover:border-white/30 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] group-hover:-translate-y-2 transition-all duration-700 relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-90 mix-blend-luminosity relative z-10"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-20 pointer-events-none" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif tracking-wide text-foreground mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-[11px] md:text-sm uppercase tracking-widest text-muted-foreground w-full">
                      {member.role.split('\n').map((line, i) => (
                        <span key={i} className={i === 1 ? "block normal-case italic font-serif text-[13px] md:text-[16px] mt-1 tracking-normal text-muted-foreground/90" : "block"}>
                          {line}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>

          {/* Rest of Team - Bottom Constellation Arc */}
          <div className="flex flex-wrap justify-center items-end gap-6 md:gap-10 lg:gap-12 w-full mt-4">
            {['shruti', 'manas', 'rithwik', 'abhijit'].map((id, index) => {
              const member = team.find(m => m.id === id);
              if (!member) return null;
              
              // Create a subtle arc effect by applying a Y offset to the middle items
              const isMiddle = index === 1 || index === 2;
              const translateY = isMiddle ? "translate-y-8" : "translate-y-0";

              return (
                <Link key={member.id} href={`/team/${member.id}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                    className={`flex flex-col items-center text-center group cursor-pointer w-28 md:w-36 lg:w-44 ${translateY}`}
                  >
                    <div className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden mb-5 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-md group-hover:border-white/30 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:-translate-y-2 transition-all duration-700 relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-80 mix-blend-luminosity relative z-10 ${
                          member.id === 'manas' ? 'object-[center_20%]' : ''
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-20 pointer-events-none" />
                    </div>
                    <h3 className="text-base md:text-lg font-serif tracking-wide text-foreground mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-[9px] md:text-[11px] uppercase tracking-widest text-muted-foreground w-full">
                      {member.role.split('\n').map((line, i) => (
                        <span key={i} className={i === 1 ? "block normal-case italic font-serif text-[11px] md:text-[13px] mt-1 tracking-normal text-muted-foreground/90" : "block"}>
                          {line}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}