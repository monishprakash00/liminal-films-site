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

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
          {team
            .sort((a, b) => {
              const order = ['shruti', 'manas', 'monish', 'rithwik', 'abhijit'];
              return order.indexOf(a.id) - order.indexOf(b.id);
            })
            .map((member, index) => (
            <Link key={member.id} href={`/team/${member.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group cursor-pointer w-32 md:w-40 lg:w-48"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden mb-6 bg-secondary shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 group-hover:border-white/20 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] group-hover:-translate-y-2 transition-all duration-700">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                      member.id === 'manas' ? 'object-[center_20%]' : ''
                    }`}
                  />
                </div>
                <h3 className="text-lg md:text-xl font-serif tracking-wide text-foreground mb-2 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground w-full">
                  {member.role.split('\n').map((line, i) => (
                    <span key={i} className={i === 1 ? "block normal-case italic font-serif text-[12px] md:text-[14px] mt-1 tracking-normal text-muted-foreground/90" : "block"}>
                      {line}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}