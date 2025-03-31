import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ExamplesSection from "@/components/ExamplesSection";
import DemoSection from "@/components/DemoSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ExamplesSection />
      <DemoSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
};

export default Home;
