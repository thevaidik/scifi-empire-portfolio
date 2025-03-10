
import { motion } from "framer-motion";

const Companies = () => {
  const companies = [
    {
      name: "SpaceX",
      description: "Revolutionizing space technology with the goal of enabling people to live on other planets.",
      field: "Aerospace"
    },
    {
      name: "DeepMind",
      description: "Researching and building safe AI systems that benefit humanity.",
      field: "Artificial Intelligence"
    },
    {
      name: "Neuralink",
      description: "Developing ultra high bandwidth brain-machine interfaces to connect humans and computers.",
      field: "Neurotechnology"
    },
    {
      name: "Boston Dynamics",
      description: "Creating robots with remarkable mobility, agility, dexterity and speed.",
      field: "Robotics"
    },
    {
      name: "AeroVironment",
      description: "Pioneering unmanned aircraft systems and efficient energy technologies.",
      field: "Aviation"
    },
    {
      name: "CERN",
      description: "Operating the world's largest particle physics laboratory and the Large Hadron Collider.",
      field: "Particle Physics"
    }
  ];

  return (
    <section id="companies" className="py-24 bg-gradient-to-t from-black to-scifi-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Interesting Companies</h2>
          <p className="text-scifi-primary/80 max-w-2xl mx-auto">
            Organizations pushing the boundaries of what's possible
          </p>
          <div className="h-1 w-20 bg-scifi-primary/50 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-scifi-dark/30 backdrop-blur-sm border border-scifi-primary/10 rounded-lg p-6 hover:border-scifi-primary/30 transition-all duration-300"
            >
              <div className="text-scifi-primary/70 text-sm font-mono mb-2">{company.field}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{company.name}</h3>
              <p className="text-white/70">{company.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
