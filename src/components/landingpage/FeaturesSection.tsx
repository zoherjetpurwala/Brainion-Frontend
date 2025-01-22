import { Lightbulb, Brain, Zap, Sparkles } from "lucide-react";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";

const features = [
  {
    icon: <Lightbulb className="h-10 w-10 text-white" />,
    title: "Idea Capture",
    description:
      "Quickly jot down your ideas anytime, anywhere. Never lose a brilliant thought again.",
  },
  {
    icon: <Brain className="h-10 w-10 text-white" />,
    title: "AI-Powered Insights",
    description:
      "Our advanced AI analyzes your notes and generates valuable insights and connections.",
  },
  {
    icon: <Zap className="h-10 w-10 text-white" />,
    title: "Instant Retrieval",
    description:
      "Find any piece of information in seconds with our powerful search and tagging system.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-white" />,
    title: "Smart Suggestions",
    description:
      "Receive personalized content and action suggestions based on your notes and interests.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-4 bg-gradient-to-bl from-blue-300 to-blue-500 rounded-3xl transition-transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50`}
            >
              <CardTitle className="flex flex-col justify-between">
                <h3 className="text-white text-2xl font-semibold">
                  {feature.title}
                </h3>
              </CardTitle>

              <CardDescription className="h-24 text-white/80 text-sm flex items-center justify-center">
                {feature.description}
              </CardDescription>
              <CardFooter className="p-2 flex justify-end items-center">
                <div className="flex justify-center items-center">
                  {feature.icon}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
