import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your Brainion account in seconds.",
  },
  {
    number: "02",
    title: "Capture Ideas",
    description: "Use our app or browser extension to save your thoughts.",
  },
  {
    number: "03",
    title: "Organize",
    description: "Let AI categorize and tag your notes automatically.",
  },
  {
    number: "04",
    title: "Gain Insights",
    description: "Discover connections and actionable insights from your ideas.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-20 rounded-3xl m-2 md:m-5 overflow-hidden">
      {/* Background with improved overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 rounded-3xl"
        style={{
          backgroundImage: "url('/waves.svg')",
        }}
      ></div>
      


      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4"
          >
            Simple Process
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-5"
          >
            How It Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-blue-700/70 max-w-2xl mx-auto"
          >
            Get started with Brainion in just a few simple steps and transform how you manage your ideas.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connected line (desktop only) */}
          <div className="absolute top-8 left-0 w-full h-0.5 bg-blue-100 hidden lg:block -z-10" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Subtle animated background */}
                <motion.div 
                  className="absolute inset-0 bg-blue-500 opacity-50"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <span className="relative z-10">{step.number}</span>
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="relative w-full h-16 flex items-center justify-center">
                  {/* Horizontal arrow for desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                    viewport={{ once: true }}
                    className="hidden lg:block"
                  >
                    <ArrowRight className="w-8 h-8 text-blue-400 mt-4" />
                  </motion.div>
                  
                  {/* Down arrow for mobile/tablet */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="lg:hidden mt-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;