
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { GalaxyBackground } from "@/components/GalaxyBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-alpha-black text-alpha-white">
      <GalaxyBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ServicesSection />
      </div>
    </div>
  );
};

export default Index;
