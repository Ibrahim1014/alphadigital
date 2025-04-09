
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="glass bg-alpha-black/80 border border-alpha-gold/30 overflow-hidden">
          {/* Particules décoratives */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-alpha-gold/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 60 - 30],
                  y: [0, Math.random() * 60 - 30],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: Math.random() * 8 + 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                className="text-2xl font-bold text-alpha-gold"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Contactez-nous
              </motion.h2>
              
              <motion.button
                onClick={onClose}
                className="text-alpha-gold/70 hover:text-alpha-gold transition-all"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="h-10 w-10 rounded-full bg-alpha-gold/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-alpha-gold" />
                </div>
                <div>
                  <p className="text-sm text-alpha-gray mb-0.5">Email</p>
                  <a 
                    href="mailto:professe84@gmail.com" 
                    className="text-white hover:text-alpha-gold transition-colors"
                  >
                    professe84@gmail.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="h-10 w-10 rounded-full bg-alpha-gold/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-alpha-gold" />
                </div>
                <div>
                  <p className="text-sm text-alpha-gray mb-0.5">Téléphone</p>
                  <a 
                    href="tel:+22790307168" 
                    className="text-white hover:text-alpha-gold transition-colors"
                  >
                    +227 90307168
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="h-10 w-10 rounded-full bg-alpha-gold/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-alpha-gold" />
                </div>
                <div>
                  <p className="text-sm text-alpha-gray mb-0.5">Localisation</p>
                  <p className="text-white">Niamey, Niger</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-4 mt-6 border-t border-alpha-gold/10"
              >
                <Button 
                  className="w-full bg-alpha-gold text-alpha-black hover:bg-alpha-gold/90"
                  onClick={onClose}
                >
                  Fermer
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
