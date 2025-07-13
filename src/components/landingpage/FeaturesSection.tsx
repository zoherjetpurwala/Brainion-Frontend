import { Lightbulb, Brain, Zap, Sparkles } from "lucide-react";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Lightbulb className="h-10 w-10 text-white" />,
    title: "Idea Capture",
    description: "Quickly jot down your ideas anytime, anywhere. Never lose a brilliant thought again.",
  },
  {
    icon: <Brain className="h-10 w-10 text-white" />,
    title: "AI-Powered Insights",
    description: "Our advanced AI analyzes your notes and generates valuable insights and connections.",
  },
  {
    icon: <Zap className="h-10 w-10 text-white" />,
    title: "Instant Retrieval",
    description: "Find any piece of information in seconds with our powerful search and tagging system.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-white" />,
    title: "Smart Suggestions",
    description: "Receive personalized content and action suggestions based on your notes and interests.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-40 h-40 rounded-full bg-blue-600/5 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4"
          >
            Powerful Features
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-5"
          >
            Everything You Need
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-blue-700/70 max-w-2xl mx-auto"
          >
            Brainion combines powerful idea management with AI intelligence to help you capture, organize, and enhance your thinking.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 50
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -8 }}
            >
              <Card
                className={`p-4 bg-gradient-to-bl from-blue-300 to-blue-500 rounded-3xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50 group overflow-hidden relative h-full`}
              >
                {/* Subtle dot pattern background */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`dots-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
                  </svg>
                </div>

                {/* Animated highlight on hover */}
                <motion.div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <CardTitle className="flex flex-col justify-between">
                  <motion.h3 
                    className="text-white text-2xl font-semibold"
                    initial={{ opacity: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.title}
                  </motion.h3>
                </CardTitle>

                <CardDescription className="h-24 text-white/80 text-sm flex items-center justify-center">
                  {feature.description}
                </CardDescription>
                
                <CardFooter className="p-2 flex justify-end items-center">
                  <motion.div 
                    className="flex justify-center items-center"
                    whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;