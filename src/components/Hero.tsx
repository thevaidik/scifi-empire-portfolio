
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced 3D Planet Background */}
      <div className="absolute inset-0 bg-scifi-dark">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Core planet sphere */}
            <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-scifi-primary/30 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-scifi-dark via-transparent to-scifi-primary/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-scifi-primary/40 via-transparent to-transparent" />
              
              {/* Atmospheric glow */}
              <div className="absolute -inset-4 bg-scifi-primary/5 blur-2xl animate-pulse" />
              
              {/* Surface details */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE1OSwgMTU4LCAxNjEsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
            </div>
            
            {/* Orbital rings */}
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
              <div className="absolute inset-[-50px] border border-scifi-primary/10 rounded-full" />
              <div className="absolute inset-[-100px] border border-scifi-primary/5 rounded-full" />
              <div className="absolute inset-[-150px] border border-scifi-primary/3 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 bg-black/20 backdrop-blur-lg rounded-xl p-8 border border-scifi-primary/10"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Hey, Vaidik here
            <div className="text-2xl md:text-3xl font-light mt-4 text-scifi-primary">
              "perception is reality"
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Normally I do development for Apple platforms (iOS, macOS, etc)
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 text-sm"
        >
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
