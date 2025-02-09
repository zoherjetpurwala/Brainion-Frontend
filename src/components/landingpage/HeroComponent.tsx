import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const HeroComponent = () => {
  const handleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/auth/google`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex flex-col items-center text-center max-sm:mt-20 gap-12 pb-16 pt-28 lg:pt-40 max-w-5xl mx-auto"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,128,255,0.25)_0%,_transparent_50%)] blur-2xl"></div>

      {/* Announcement Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative flex items-center space-x-2 rounded-full bg-white py-1 md:px-5 px-2 max-sm:text-sm shadow-md ring-1 ring-blue-800/20"
      >
        🚀 Brainion Beta – Ready to Use Now!
      </motion.div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.020em] text-center text-blue-900 px-2">
        <span className="text-blue-800/35">The</span> AI-powered Brain Companion
        <span className="text-blue-800/35"> for storing your ideas </span>
        <br className="hidden md:block" />
        anytime, anywhere
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-blue-950 max-w-2xl leading-snug px-2">
        Brainion transforms your notes and ideas into actionable insights with
        AI-powered intelligence.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={handleLogin}
          className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-6 py-4 rounded-full flex items-center gap-2 shadow-lg transition-all hover:scale-105"
        >
          <FaGoogle className="text-xl" />
          Continue with Google
        </Button>
      </div>

      {/* Animated Floating Gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute inset-x-0 bottom-[-20%] h-60 w-60 md:w-96 md:h-96 bg-[radial-gradient(circle,_rgba(0,128,255,0.2)_0%,_transparent_80%)] rounded-full blur-3xl"
      />
    </motion.div>
  );
};

export default HeroComponent;
