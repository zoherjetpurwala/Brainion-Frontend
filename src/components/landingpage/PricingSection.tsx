import { Check, Zap } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

// Type definitions
interface Plan {
  name: string;
  price: string;
  period?: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  highlightColor: string;
  borderColor: string;
  buttonClasses: string;
}

interface PlanCardProps {
  plan: Plan;
  isPopular: boolean;
  index: number;
}

type BillingCycle = "monthly" | "yearly";

const plans: Plan[] = [
  {
    name: "Basic",
    price: "FREE",
    description: "Perfect for getting started and exploring Brainion",
    features: [
      "Limited note storage",
      "Limited file storage",
      "Basic AI capabilities",
      "Mobile app access",
      "7-day history",
    ],
    ctaText: "Get Started",
    highlightColor: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
    buttonClasses: "bg-blue-600 text-white hover:bg-blue-700",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Ideal for individuals who want the full Brainion experience",
    popular: true,
    features: [
      "Unlimited note storage",
      "Unlimited file storage",
      "Advanced AI capabilities",
      "Priority support",
      "Full integration suite",
      "Unlimited history",
      "Advanced analytics",
    ],
    ctaText: "Start Now",
    highlightColor: "from-blue-400 to-blue-600",
    borderColor: "border-blue-500",
    buttonClasses: "bg-blue-800 text-white hover:bg-blue-900",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations with specific needs",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features",
      "Team collaboration tools",
      "Admin dashboard",
      "SLA guarantee",
    ],
    ctaText: "Contact Sales",
    highlightColor: "from-indigo-50 to-indigo-100",
    borderColor: "border-indigo-200",
    buttonClasses: "bg-indigo-600 text-white hover:bg-indigo-700",
  },
];

const PlanCard: React.FC<PlanCardProps> = ({ plan, isPopular, index }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex"
    >
      <Card
        className={`relative flex flex-col rounded-3xl shadow-lg w-full
          ${isPopular ? "border-2 border-blue-500" : "border border-gray-200"}
          ${isPopular ? "transform md:scale-105 z-10" : ""}
        `}
      >
        {/* Card background */}
        <div className={`absolute overflow-hidden inset-0 bg-gradient-to-b ${plan.highlightColor} opacity-50 z-0`}></div>
        
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute z-10 -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-blue-400">
            <Zap className="w-3.5 h-3.5" />
            Most Popular
          </div>
        )}
        
        <CardHeader className="relative z-10">
          <CardTitle className={`text-xl font-bold ${isPopular ? "text-blue-800" : "text-gray-900"}`}>
            {plan.name}
          </CardTitle>
          <CardDescription className="flex items-baseline mt-2">
            <span className={`text-3xl font-bold ${isPopular ? "text-blue-800" : "text-gray-900"}`}>
              {plan.price}
            </span>
            {plan.period && (
              <span className={`ml-1 text-sm ${isPopular ? "text-blue-700" : "text-gray-600"}`}>
                {plan.period}
              </span>
            )}
          </CardDescription>
          <p className={`mt-2 text-sm ${isPopular ? "text-blue-700" : "text-gray-600"}`}>
            {plan.description}
          </p>
        </CardHeader>
        
        <CardContent className="relative z-10 flex-grow">
          <ul className="space-y-3">
            {plan.features.map((feature: string, i: number) => (
              <motion.li 
                key={i} 
                className="flex items-start" 
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`flex-shrink-0 p-1 rounded-full mr-2 ${
                  isPopular 
                    ? "bg-blue-100 text-blue-600" 
                    : "bg-green-100 text-green-500"
                }`}>
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className={`text-sm ${isPopular ? "text-blue-800" : "text-gray-700"}`}>
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter className="relative z-10 pb-6">
          <motion.div 
            className="w-full"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className={`w-full rounded-xl py-6 font-medium relative overflow-hidden ${plan.buttonClasses}`}
            >
              <span className="relative z-10">{plan.ctaText}</span>
              
              {/* Button hover effect */}
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "0%" : "-100%" }}
                transition={{ duration: 0.4 }}
              />
            </Button>
          </motion.div>
        </CardFooter>
        
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 opacity-20">
          <svg width="120" height="120" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className={isPopular ? "text-blue-400" : "text-gray-300"} />
          </svg>
        </div>
      </Card>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  
  const handleBillingCycleChange = (cycle: BillingCycle): void => {
    setBillingCycle(cycle);
  };
  
  return (
    <section id="pricing" className="relative py-24 rounded-3xl m-2 md:m-5 overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 rounded-3xl"
        style={{
          backgroundImage: "url('/background.svg')",
        }}
      />
      
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4"
          >
            Pricing Plans
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-5"
          >
            Choose Your Plan
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-blue-700/70 max-w-2xl mx-auto mb-8"
          >
            Select the perfect plan that suits your needs. Upgrade or downgrade anytime.
          </motion.p>
          
          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-50 p-1 rounded-full mb-10"
          >
            <button
              onClick={() => handleBillingCycleChange("monthly")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "monthly" 
                  ? "bg-white text-blue-800 shadow-sm" 
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingCycleChange("yearly")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                billingCycle === "yearly" 
                  ? "bg-white text-blue-800 shadow-sm" 
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              Yearly
              <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded">Save 20%</span>
            </button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 relative">
          {plans.map((plan: Plan, index: number) => (
            <PlanCard 
              key={plan.name} 
              plan={plan} 
              isPopular={plan.popular || false} 
              index={index} 
            />
          ))}
        </div>
        
        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-blue-700/70 mb-2">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-blue-700/70">
            Questions? <a href="#contact" className="text-blue-600 hover:underline">Contact our sales team</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;