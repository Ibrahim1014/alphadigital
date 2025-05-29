import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { 
        y: 50,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out"
      }
    );
  }, [index]);

  return (
    <Card ref={cardRef} className="glass hover:glass-gold transition-all duration-300 group opacity-0">
      <CardHeader>
        <div className="glass-gold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6 text-alpha-gold" />
        </div>
        <CardTitle className="text-lg font-semibold mb-2 text-alpha-white text-center">
          {title}
        </CardTitle>
        <CardDescription className="text-alpha-gray text-center">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
