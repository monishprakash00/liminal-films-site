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
          <div className="w-12 h-px bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 border border-border p-1">
                <div className="w-full h-full rounded-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>
              </div>
              <h3 className="text-xl font-serif text-foreground mb-1">{member.name}</h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
