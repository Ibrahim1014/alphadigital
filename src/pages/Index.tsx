
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AIDetectionSection } from "@/components/AIDetectionSection";
import { GalaxyBackground } from "@/components/GalaxyBackground";
import { ChatbotSection } from "@/components/ChatbotSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-alpha-black text-alpha-white">
      <GalaxyBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ServicesSection />
        <PortfolioSection />
        <AIDetectionSection />
        <ChatbotSection />
      </div>
    </div>
  );
};

export default Index;
