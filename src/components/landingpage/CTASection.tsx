import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  const handleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/auth/google`;
  };

  return (
    <section className="relative rounded-3xl m-2 md:m-5 py-24 overflow-hidden">
      {/* Gradient background with improved visual effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl"></div>
      
      {/* SVG background pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 rounded-3xl"
        style={{
          backgroundImage: "url('/circle.svg')",
        }}
      ></div>
      
      {/* Animated circles */}
      <motion.div 
        className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-10 right-10 w-60 h-60 bg-blue-300 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      ></motion.div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-blue-400/30 text-white text-sm font-medium mb-5 backdrop-blur-sm border border-white/20"
        >
          Limited Time Offer
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
        >
          Ready to Supercharge Your Ideas?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl mb-8 text-blue-50 leading-relaxed"
        >
          Join thousands of users who are already benefiting from Brainion's
          AI-powered insights. Get started today and see the difference.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleLogin} 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 text-base"
            >
              <FaGoogle className="text-xl" />
              Get Started for Free
            </Button>
          </motion.div>
          
          <motion.a 
            href="#how-it-works"
            className="text-white border border-white/30 hover:bg-white/10 font-medium py-3 px-8 rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>See How It Works</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
          </motion.a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center gap-8 text-blue-50"
        >
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">10k+</div>
            <div className="text-sm opacity-80">Active Users</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">5M+</div>
            <div className="text-sm opacity-80">Ideas Stored</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">4.9/5</div>
            <div className="text-sm opacity-80">User Rating</div>
          </div>
        </motion.div>
      </div>
      

    </section>
  );
};

export default CTASection;