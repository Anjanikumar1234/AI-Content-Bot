
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
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <Card
        className={`relative border-0 overflow-hidden backdrop-blur-xl h-[280px] transition-all duration-300 ${
          isSelected ? "ring-2 ring-[#E50914]" : ""
        } bg-gradient-to-br from-black/40 to-[#E50914]/5`}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/60" />
        
        <div className="relative p-6 h-full flex flex-col justify-center items-center text-center">
          <div className="text-5xl text-[#E50914] mb-6 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            {title}
          </h3>
          
          <p className="text-sm text-white/70">
            {description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContentTypeCard;
