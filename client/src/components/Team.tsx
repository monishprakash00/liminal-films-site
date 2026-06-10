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

        <div className="flex flex-col items-center gap-16 max-w-7xl mx-auto">
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
                    className="flex flex-col items-center text-center group cursor-pointer w-48 md:w-64 lg:w-80"
                  >
                    <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden mb-6 bg-secondary shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 group-hover:border-white/20 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] group-hover:-translate-y-2 transition-all duration-700">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      />
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

          {/* Rest of Team - Monumental Grid */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-start w-full">
            {/* Left Group (Shruti, Manas) */}
            <div className="flex justify-center gap-6 md:gap-10 lg:gap-12 lg:pr-16 mb-8 lg:mb-0">
              {['shruti', 'manas'].map((id, index) => {
                const member = team.find(m => m.id === id);
                if (!member) return null;
                
                return (
                  <Link key={member.id} href={`/team/${member.id}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      className="flex flex-col items-center text-center group cursor-pointer w-36 md:w-48 lg:w-56"
                    >
                      <div className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden mb-5 bg-secondary shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 group-hover:border-white/20 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] group-hover:-translate-y-2 transition-all duration-700">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                            member.id === 'manas' ? 'object-[center_20%]' : ''
                          }`}
                        />
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

            {/* Right Group (Rithwik, Abhijit) */}
            <div className="flex justify-center gap-6 md:gap-10 lg:gap-12 lg:pl-16">
              {['rithwik', 'abhijit'].map((id, index) => {
                const member = team.find(m => m.id === id);
                if (!member) return null;
                
                return (
                  <Link key={member.id} href={`/team/${member.id}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
                      className="flex flex-col items-center text-center group cursor-pointer w-36 md:w-48 lg:w-56"
                    >
                      <div className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden mb-5 bg-secondary shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 group-hover:border-white/20 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] group-hover:-translate-y-2 transition-all duration-700">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                        />
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
        </div>
      </motion.div>
    </section>
  );
}