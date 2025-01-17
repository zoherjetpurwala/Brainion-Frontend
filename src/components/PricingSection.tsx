import { Check } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const plans = [
  {
    name: "Basic",
    price: "FREE",
    features: [
      "Limited note storage",
      "Limited file storage",
      "Basic AI compabilities",
    ],
  },
  {
    name: "Pro",
    price: "$9.99",
    features: [
      "Unlimited note storage",
      "Unlimited file storage",
      "Advanced AI compabilities",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-16 rounded-3xl m-2 md:m-5">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 rounded-3xl"
        style={{
          backgroundImage: "url('/background.svg')",
        }}
      ></div>
      <div className=" relative container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={` flex flex-col rounded-3xl shadow-lg ${
                plan.name === "Pro"
                  ? "border border-blue-600 bg-blue-400  text-white transform scale-105"
                  : "bg-white"
              }`}
            >
              {plan.name === "Pro" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-300 border border-blue-600 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-gray-900">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {(plan.name === "Pro") && (
                    <span className="text-gray-600">/month</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check
                        className={`h-5 w-5 mr-2 ${
                          plan.name === "Pro"
                            ? "text-green-600"
                            : "text-green-500"
                        }`}
                      />
                      <span
                        className={`${
                          plan.name === "Pro"
                            ? "text-gray-800"
                            : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full rounded-xl ${
                    plan.name === "Pro"
                      ? "bg-blue-800 text-white hover:bg-blue-500"
                      : "bg-blue-300"
                  }`}
                >
                  {plan.name === "Pro" ? "Start Now" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
