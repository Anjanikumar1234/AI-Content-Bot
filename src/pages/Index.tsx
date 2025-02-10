
import { useState } from "react";
import { Mail, BookText, Share2, Type } from "lucide-react";
import ContentTypeCard from "@/components/ContentTypeCard";
import ContentForm from "@/components/ContentForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const { toast } = useToast();

  const contentTypes = [
    {
      id: "email",
      title: "Email Generation",
      description: "Create professional and personalized emails",
      icon: <Mail className="w-8 h-8" />,
    },
    {
      id: "essay",
      title: "Essay Writing",
      description: "Generate well-structured essays",
      icon: <BookText className="w-8 h-8" />,
    },
    {
      id: "social",
      title: "Social Media",
      description: "Create engaging social media content",
      icon: <Share2 className="w-8 h-8" />,
    },
    {
      id: "text",
      title: "Text Generation",
      description: "Generate various types of text content",
      icon: <Type className="w-8 h-8" />,
    },
  ];

  const handleFormSubmit = async (data: any) => {
    // Here we'll integrate with an AI service later
    toast({
      title: "Success!",
      description: "Your content has been generated.",
    });
    setGeneratedContent("Sample generated content based on your inputs...");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Personalized Content Generator</h1>
          <p className="text-lg text-gray-600">
            Create tailored content for any purpose with our AI-powered assistant
          </p>
        </div>

        {!selectedType ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentTypes.map((type) => (
              <ContentTypeCard
                key={type.id}
                title={type.title}
                description={type.description}
                icon={type.icon}
                onClick={() => setSelectedType(type.id)}
                isSelected={selectedType === type.id}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {contentTypes.find((t) => t.id === selectedType)?.title}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedType(null)}
                  className="text-gray-500"
                >
                  Change Type
                </Button>
              </div>
              <ContentForm type={selectedType} onSubmit={handleFormSubmit} />
            </div>

            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Generated Content</h2>
                {generatedContent && (
                  <Button onClick={copyToClipboard} variant="outline">
                    Copy
                  </Button>
                )}
              </div>
              <div className="prose max-w-none">
                {generatedContent ? (
                  <div className="bg-white/50 p-4 rounded-lg min-h-[200px]">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 min-h-[200px] flex items-center justify-center">
                    Generated content will appear here
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
