
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ContentTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
}

const ContentTypeCard = ({ title, description, icon, onClick, isSelected }: ContentTypeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, rotateX: 2, rotateY: 2 }}
      className="relative group"
    >
      {/* Lightning effect overlay */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-white/10 via-white/5 to-black/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-black/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

      <Card
        className={`relative border-0 overflow-hidden backdrop-blur-xl ${
          isSelected ? "ring-2 ring-white/50" : ""
        }`}
        onClick={onClick}
      >
        {/* Glass background with depth effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
        
        {/* Content with pseudo-3D transform */}
        <div className="relative p-6 transition-transform duration-300 group-hover:transform group-hover:translate-y-[-2px]">
          <div className="flex flex-col items-center text-center gap-4">
            {/* Icon with glow effect */}
            <div className="text-4xl text-white relative">
              <div className="absolute inset-0 blur-sm opacity-50 group-hover:opacity-100 transition-opacity">
                {icon}
              </div>
              <div className="relative">
                {icon}
              </div>
            </div>
            
            {/* Text content with gradient */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContentTypeCard;
