
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { getTranslation } from "@/utils/translations";

interface HomePageProps {
  selectedLanguage: string;
}

const HomePage = ({ selectedLanguage }: HomePageProps) => {
  return (
    <div className="space-y-16 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 mb-6">
          <Sparkles className="w-4 h-4 text-[#E50914]" />
          <span className="text-sm text-[#E50914]">
            {getTranslation("subtitle")}
          </span>
        </div>
        
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E50914] to-[#FF6B6B]">
          {getTranslation("introTitle")}
        </h1>
        
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          {getTranslation("introDesc")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">
          {getTranslation("features")}
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-gradient-to-br from-black/40 to-[#E50914]/5 border border-[#E50914]/10 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {getTranslation(`feature${i}`)}
              </h3>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
