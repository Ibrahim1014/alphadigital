
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-alpha-black text-alpha-white">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ServicesSection />
      </div>
    </div>
  );
};

export default Index;
