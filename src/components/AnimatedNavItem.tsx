
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

interface AnimatedNavItemProps {
  href: string;
  name: string;
  index: number;
}

export const AnimatedNavItem = ({ href, name, index }: AnimatedNavItemProps) => {
  const location = useLocation();
  const isActive = location.hash === href;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={href}
        className={`relative group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isActive ? "text-alpha-gold bg-alpha-gold/10" : "text-white/80 hover:text-alpha-gold"
        }`}
      >
        <motion.span
          className="absolute inset-0 rounded-lg bg-alpha-gold/5"
          initial={false}
          animate={{
            scale: isActive ? 1 : 0.95,
            opacity: isActive ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative">{name}</span>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-alpha-gold"
            layoutId="activeTab"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
};
