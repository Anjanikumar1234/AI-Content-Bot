
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
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
      />
      <Card
        className={`content-card cursor-pointer relative ${
          isSelected ? "ring-2 ring-purple-500" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-4xl text-purple-400 group-hover:text-purple-300 transition-colors">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-white/90">
              {title}
            </h3>
            <p className="text-sm text-white/60 group-hover:text-white/70">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContentTypeCard;

