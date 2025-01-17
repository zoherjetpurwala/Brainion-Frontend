import NavigationBar from "../components/Navbar";
import HomeCompnent from "../components/HeroComponent";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <main className="flex-1 w-full lg:mx-auto">
        <div className="flex relative flex-col h-screen gap-4 justify-center items-center pb-24 w-full">
          <div className="rounded-b-3xl overflow-visible absolute inset-0 select-none z-[-1] bg-[radial-gradient(at_100%_95%,_rgba(0,_128,_255,_0.3)_0px,_transparent_50%),_radial-gradient(at_50%_95%,_rgba(102,_204,_255,_0.3)_0px,_transparent_50%),_radial-gradient(at_0%_95%,_rgba(0,_102,_204,_0.17)_0px,_transparent_50%)]"></div>
          <HomeCompnent />
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
export default Home;
