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

        <div className="grid grid-cols-2 gap-y-20 gap-x-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <Link key={member.id} href={`/team/${member.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 bg-secondary">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={`w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 ${
                      member.id === 'manas' ? 'object-[center_20%]' : ''
                    }`}
                  />
                </div>
                <h3 className="text-base md:text-lg font-sans tracking-wide text-foreground mb-2 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
                  {member.role}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}