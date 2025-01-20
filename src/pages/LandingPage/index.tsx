import NavigationBar from "../../components/landingpage/Navbar";
import HeroComponent from "../../components/landingpage/HeroComponent";
import FeaturesSection from "../../components/landingpage/FeaturesSection";
import HowItWorksSection from "../../components/landingpage/HowItWorksSection";
import TestimonialsSection from "../../components/landingpage/TestimonialsSection";
import PricingSection from "../../components/landingpage/PricingSection";
import FAQSection from "../../components/landingpage/FAQSection";
import CTASection from "../../components/landingpage/CTASection";
import Footer from "../../components/landingpage/Footer";

const LandingPage = () => {
  return (
    <div>
      <NavigationBar />
      <main className="flex-1 w-full lg:mx-auto">
        <div className="flex relative flex-col h-screen gap-4 justify-center items-center pb-24 w-full">
          <div className="rounded-b-3xl overflow-visible absolute inset-0 select-none z-[-1] bg-[radial-gradient(at_100%_95%,_rgba(0,_128,_255,_0.3)_0px,_transparent_50%),_radial-gradient(at_50%_95%,_rgba(102,_204,_255,_0.3)_0px,_transparent_50%),_radial-gradient(at_0%_95%,_rgba(0,_102,_204,_0.17)_0px,_transparent_50%)]"></div>
          <HeroComponent />
        </div>
      </main>
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};
export default LandingPage;
