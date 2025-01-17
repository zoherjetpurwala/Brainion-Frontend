import { Button } from "../components/ui/button";

const CTASection = () => {
  return (
    <section className="relative rounded-3xl m-2 md:m-5 py-20 bg-blue-600">
      {/* SVG background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 rounded-3xl"
        style={{
          backgroundImage: "url('/circle.svg')",
        }}
      ></div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Supercharge Your Ideas?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Join thousands of users who are already benefiting from Brainion's AI-powered insights.
        </p>
        <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-full text-lg">
          Get Started for Free
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
