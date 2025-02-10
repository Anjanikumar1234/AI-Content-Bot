
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    >
      <Card
        className={`content-card cursor-pointer ${
          isSelected ? "ring-2 ring-primary" : ""
        }`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-4xl text-primary">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContentTypeCard;
