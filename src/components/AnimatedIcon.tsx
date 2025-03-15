
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  Icon: LucideIcon;
  className?: string;
}

export const AnimatedIcon = ({ Icon, className }: AnimatedIconProps) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      <Icon className="h-6 w-6 text-alpha-gold" />
    </motion.div>
  );
};
