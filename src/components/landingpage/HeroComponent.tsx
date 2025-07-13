import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

// Type definitions
interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  size: number;
  duration: number;
  delay: number;
}

interface Stat {
  label: string;
  value: string;
}

const HeroComponent: React.FC = () => {
  const handleLogin = (): void => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/auth/google`;
  };

  // Fixed: Using Array.from instead of Array.fill() without arguments
  const particles: Particle[] = Array.from({ length: 5 }, (_, i: number) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: 10 + Math.random() * 40,
    duration: 15 + Math.random() * 30,
    delay: Math.random() * 5,
  }));

  // Stats data with proper typing
  const stats: Stat[] = [
    { label: "Active Users", value: "10,000+" },
    { label: "Notes Created", value: "1M+" },
    { label: "Ideas Organized", value: "500K+" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex flex-col items-center text-center max-sm:mt-20 gap-12 pb-16 pt-28 lg:pt-40 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient circles */}
        {particles.map((particle: Particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-500/10"
            initial={{
              x: `${particle.initialX}%`,
              y: `${particle.initialY}%`,
              opacity: 0.3,
              scale: 0.8,
            }}
            animate={{
              x: [`${particle.initialX}%`, `${particle.initialX + 10}%`, `${particle.initialX - 5}%`, `${particle.initialX}%`],
              y: [`${particle.initialY}%`, `${particle.initialY - 15}%`, `${particle.initialY + 10}%`, `${particle.initialY}%`],
              opacity: [0.2, 0.4, 0.3, 0.2],
              scale: [0.8, 1.2, 0.9, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            style={{
              width: particle.size,
              height: particle.size,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      {/* Announcement Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        className="relative flex items-center space-x-2 rounded-full bg-white/80 backdrop-blur-sm py-1.5 md:px-5 px-4 max-sm:text-sm shadow-lg ring-1 ring-blue-800/20 cursor-pointer group"
      >
        <span className="relative inline-flex overflow-hidden">
          <motion.span
            initial={{ y: 0 }}
            animate={{ y: [-20, 0, 0, -20] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="inline-block"
          >
            🚀
          </motion.span>
        </span>
        <span className="font-medium">Brainion Beta – Ready to Use Now!</span>
        <motion.span 
          className="ml-1 text-blue-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>

      {/* Main Heading with typing effect */}
      <div className="relative">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.020em] text-center text-blue-900 px-2 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="text-blue-800/35">The</span>{" "}
          <span className="relative">
            AI-powered
            <motion.span
              className="absolute -z-10 left-0 bottom-0 w-full h-3 bg-blue-400/20 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </span>{" "}
          Brain Companion
          <span className="text-blue-800/35"> for storing your ideas </span>
          <br className="hidden md:block" />
          anytime, anywhere
        </motion.h1>
        
        {/* Animated underline effect */}
        <motion.div
          className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
          initial={{ width: 0, x: "-50%" }}
          animate={{ width: "40%" }}
          transition={{ delay: 1.5, duration: 1 }}
        />
      </div>

      {/* Subheading with sequential fade-in */}
      <motion.p 
        className="text-lg md:text-xl text-blue-950 max-w-2xl leading-relaxed px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Brainion transforms your notes and ideas into{" "}
        <span className="relative inline-block">
          actionable insights
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[6px] bg-blue-200/50 -z-10"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.6, duration: 0.6 }}
          />
        </span>{" "}
        with AI-powered intelligence.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleLogin}
            className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-8 py-6 rounded-full flex items-center gap-3 shadow-lg transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <FaGoogle className="text-xl" />
              Continue with Google
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-blue-300 blur-md"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Counter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-8 md:gap-16 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {stats.map((stat: Stat, index: number) => (
          <motion.div 
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-xl md:text-2xl font-bold text-blue-800">{stat.value}</div>
            <div className="text-sm text-blue-700/60">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroComponent;