import { motion } from "framer-motion";
import team1 from "../assets/images/team-1.png";
import team2 from "../assets/images/team-2.png";
import team3 from "../assets/images/team-3.png";

const team = [
  {
    name: "Elena Vance",
    role: "Director / Founder",
    image: team1,
  },
  {
    name: "Marcus Cole",
    role: "Head of Cinematography",
    image: team2,
  },
  {
    name: "Sarah Jenkins",
    role: "Executive Producer",
    image: team3,
  }
];

export function Team() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="team" className="py-24 bg-card/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">The Visionaries</h2>
          <motion.div 
            className="w-12 h-px bg-accent mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originX: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              <motion.div 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 border border-border p-1"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="w-full h-full rounded-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <motion.img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700"
                    initial={{ opacity: 0.2 }}
                    whileHover={{ opacity: 0 }}
                  ></motion.div>
                </div>
              </motion.div>
              <motion.h3 
                className="text-xl font-serif text-foreground mb-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {member.name}
              </motion.h3>
              <motion.p 
                className="text-xs uppercase tracking-widest text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + index * 0.1 }}
              >
                {member.role}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
