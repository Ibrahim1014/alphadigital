
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <Card className="glass hover:glass-gold transition-all duration-300 group animate-fade-in">
      <CardHeader>
        <div className="glass-gold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
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
