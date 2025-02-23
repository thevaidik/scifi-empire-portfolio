
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Sci-fi Globe Background */}
      <div className="absolute inset-0 bg-scifi-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-scifi-primary/20 to-scifi-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-scifi-primary/30 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTU5LCAxNTgsIDE2MSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_50%,transparent_0%,rgba(159,158,161,0.05)_100%)] animate-[ping_4s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-[radial-gradient(30%_30%_at_50%_50%,rgba(159,158,161,0.05)_0%,transparent_100%)] animate-[ping_4s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-scifi-primary/10 animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-scifi-primary/20 animate-[spin_15s_linear_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-scifi-primary/30 animate-[spin_10s_linear_infinite]" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10 text-center"
      >
        <div className="space-y-6">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-scifi-light via-scifi-primary to-scifi-light"
          >
            Hey, Vaidik here
            <div className="text-2xl md:text-3xl font-light mt-4 text-scifi-primary">
              "perception is reality"
            </div>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Normally I do development for Apple platforms (iOS, macOS, etc)
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4"
      >
        <div className="grid grid-cols-1 gap-4">
          <a
            href="#tools"
            className="w-full px-8 py-4 rounded-lg bg-scifi-primary/20 border border-scifi-primary/50 text-white hover:bg-scifi-primary/30 transition-all duration-300 text-center"
          >
            Explore My Tools
          </a>
          <a
            href="#companies"
            className="w-full px-8 py-4 rounded-lg bg-scifi-dark/50 border border-scifi-light/20 text-white hover:bg-scifi-dark/70 transition-all duration-300 text-center"
          >
            Interesting Companies
          </a>
        </div>
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
