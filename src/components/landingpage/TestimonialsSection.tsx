import { Marquee } from "../ui/marquee";
import { motion } from "framer-motion";
import { useState } from "react";

// Type definitions
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

interface CustomerStat {
  value: string;
  label: string;
}

// Enhanced testimonials with additional details
const testimonials: Testimonial[] = [
  {
    quote:
      "Brainion has revolutionized the way I organize my thoughts. It's like having a personal assistant for my brain!",
    author: "Sarah J.",
    role: "Entrepreneur",
    avatar: "1",
    rating: 5,
  },
  {
    quote:
      "The AI-powered insights have helped me connect ideas I never would have on my own. It's truly game-changing.",
    author: "Michael L.",
    role: "Researcher",
    avatar: "2",
    rating: 5,
  },
  {
    quote:
      "I can't imagine working without Brainion now. It's become an essential part of my creative process.",
    author: "Emily R.",
    role: "Writer",
    avatar: "3",
    rating: 5,
  },
  {
    quote:
      "My productivity has doubled since I started using Brainion. The way it organizes information is incredible.",
    author: "David K.",
    role: "Project Manager",
    avatar: "4",
    rating: 5,
  },
  {
    quote:
      "As a student, Brainion has been invaluable for organizing my research and connecting concepts across courses.",
    author: "Priya M.",
    role: "Graduate Student",
    avatar: "5",
    rating: 5,
  },
  {
    quote:
      "The UI is so intuitive, and the AI suggestions are spot on. Brainion understands how my brain works better than I do!",
    author: "Thomas W.",
    role: "UX Designer",
    avatar: "6",
    rating: 5,
  },
  {
    quote:
      "Brainion has transformed how our team collaborates on ideas. We can easily share and build on each other's thoughts.",
    author: "Lisa C.",
    role: "Team Lead",
    avatar: "7",
    rating: 5,
  },
  {
    quote:
      "I was skeptical at first, but after a week of using Brainion, I was completely sold. It's worth every penny.",
    author: "Robert J.",
    role: "Marketing Director",
    avatar: "8",
    rating: 5,
  },
  {
    quote:
      "The way Brainion connects related ideas has led to several breakthroughs in my research. Couldn't recommend it more.",
    author: "Angela T.",
    role: "Scientist",
    avatar: "9",
    rating: 5,
  },
  {
    quote:
      "I use Brainion daily to keep track of client information and project details. It's transformed my consulting practice.",
    author: "James H.",
    role: "Consultant",
    avatar: "10",
    rating: 5,
  },
  {
    quote:
      "The mobile app is fantastic - I can capture ideas on the go and Brainion organizes everything beautifully.",
    author: "Sophia L.",
    role: "Entrepreneur",
    avatar: "11",
    rating: 5,
  },
  {
    quote:
      "After trying countless note-taking and productivity apps, Brainion is the only one that actually enhances my thinking.",
    author: "Daniel R.",
    role: "Content Creator",
    avatar: "12",
    rating: 5,
  },
];

// Testimonial Card Component
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Randomly select a light background color class
  const bgColors: string[] = [
    "bg-blue-50",
    "bg-indigo-50",
    "bg-sky-50",
    "bg-cyan-50",
  ];
  const borderColors: string[] = [
    "border-blue-400/30",
    "border-indigo-400/30",
    "border-sky-400/30",
    "border-cyan-400/30",
  ];
  
  const cardBg: string = bgColors[index % bgColors.length];
  const cardBorder: string = borderColors[index % borderColors.length];
  
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className={`${cardBg} w-80 md:w-96 p-6 rounded-xl shadow-sm border ${cardBorder} mx-3 flex flex-col justify-between h-full relative group overflow-hidden`}
    >
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-200/40 rounded-full blur-xl opacity-60"></div>
      <div className="absolute -bottom-8 -left-4 w-16 h-16 bg-blue-400/30 rounded-full blur-xl opacity-60"></div>
      
      {/* Quote icon */}
      <div className="absolute top-4 right-4 text-blue-200 opacity-70">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V15C10 16.0609 9.57857 17.0783 8.82843 17.8284C8.07828 18.5786 7.06087 19 6 19H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V15C20 16.0609 19.5786 17.0783 18.8284 17.8284C18.0783 18.5786 17.0609 19 16 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Star rating */}
      <div className="flex mb-3">
        {Array.from({ length: testimonial.rating }, (_, i: number) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <p className="text-gray-700 mb-6 relative z-10">"{testimonial.quote}"</p>
      
      {/* Author info */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="relative">
          <img
            src={`https://avatar.iran.liara.run/public/${testimonial.avatar}`}
            alt={testimonial.author}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <motion.div
            animate={{ 
              scale: isHovered ? [1, 1.15, 1] : 1,
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shadow-sm border border-white"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
        <div>
          <p className="text-gray-900 font-semibold text-sm">{testimonial.author}</p>
          <p className="text-gray-500 text-xs">{testimonial.role}</p>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#4B5563" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
        </svg>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  // Customer statistics data
  const customerStats: CustomerStat[] = [
    { value: "10,000+", label: "Active Users" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "97%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Customer Support" }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-blue-50/50 to-transparent"></div>
      
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative w-full px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4"
          >
            Testimonials
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-5"
          >
            What Our Users Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-blue-700/70 max-w-2xl mx-auto"
          >
            Join thousands of satisfied users who have transformed how they capture and organize their ideas.
          </motion.p>
        </div>
        
        <div className="mb-20">
          {/* First marquee - left to right */}
          <Marquee pauseOnHover className="[--duration:60s] py-4">
            {testimonials.slice(0, 6).map((testimonial: Testimonial, index: number) => (
              <TestimonialCard key={`first-${index}`} testimonial={testimonial} index={index} />
            ))}
          </Marquee>
          
          {/* Second marquee - right to left (reversed) */}
          <Marquee pauseOnHover reverse className="[--duration:50s] py-4 -mt-4">
            {testimonials.slice(6, 12).map((testimonial: Testimonial, index: number) => (
              <TestimonialCard key={`second-${index}`} testimonial={testimonial} index={index + 6} />
            ))}
          </Marquee>
        </div>
        
        {/* Customer metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {customerStats.map((stat: CustomerStat, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-100"
            >
              <h3 className="text-3xl font-bold text-blue-800 mb-1">{stat.value}</h3>
              <p className="text-blue-600/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Side fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default TestimonialsSection;