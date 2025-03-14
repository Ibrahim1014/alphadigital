
import { Button } from "@/components/ui/button";
import { MessageSquare, Shield, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10" />
      
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-8 animate-fade-in">
            <span className="text-primary text-sm font-medium">Introducing Alpha Digital</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Your Digital Partner for
            <span className="text-gradient"> Innovation & Truth</span>
          </h1>
          
          <p className="text-gray-600 text-xl mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Empowering businesses with cutting-edge digital solutions and advanced AI-powered fake news detection
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {[
              {
                icon: <Zap className="h-6 w-6 text-primary" />,
                title: "Digital Services",
                description: "Comprehensive digital marketing and development solutions"
              },
              {
                icon: <Shield className="h-6 w-6 text-primary" />,
                title: "Fake News Detection",
                description: "Advanced AI-powered detection of manipulated content"
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                title: "24/7 Support",
                description: "Round-the-clock assistance powered by AI and human experts"
              }
            ].map((feature, index) => (
              <div key={index} className="glass p-6 transition-transform duration-300 hover:scale-105">
                <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
