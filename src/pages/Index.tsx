
import { useState } from "react";
import { Mail, BookText, Share2, Type, Sparkles } from "lucide-react";
import ContentTypeCard from "@/components/ContentTypeCard";
import ContentForm from "@/components/ContentForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { generateContent } from "@/api/generate";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
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

  const generatePrompt = (type: string, data: any) => {
    switch (type) {
      case "email":
        return `Write a ${data.tone || "professional"} email from ${data.senderName || "sender"} to ${data.receiverName || "receiver"} that is ${data.length || "medium"} in length. Type: ${data.emailType || "compose"}. Content context: ${data.content}`;
      case "essay":
        return `Write a ${data.essayType || "simple"} essay that is ${data.length || "medium"} in length about: ${data.content}`;
      case "social":
        return `Write a ${data.style || "professional"} social media post for ${data.platform || "LinkedIn"} that is ${data.length || "medium"} in length about: ${data.content}`;
      case "text":
        return `${data.textType || "Summarize"} the following text to be ${data.length || "medium"} in length: ${data.content}`;
      default:
        return data.content;
    }
  };

  const handleFormSubmit = async (data: any) => {
    if (!data.content) {
      toast({
        title: "Error",
        description: "Please provide content or context for generation",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = generatePrompt(selectedType!, data);
      const generatedText = await generateContent(prompt);
      setGeneratedContent(generatedText);
      
      toast({
        title: "Success!",
        description: "Your content has been generated.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2D1B69] p-8">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto relative"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/80">AI-Powered Content Generation</span>
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Personalized Content Generator
          </h1>
          <p className="text-lg text-white/60">
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
                <h2 className="text-2xl font-semibold text-white">
                  {contentTypes.find((t) => t.id === selectedType)?.title}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedType(null)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  Change Type
                </Button>
              </div>
              <ContentForm type={selectedType} onSubmit={handleFormSubmit} />
            </div>

            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Generated Content</h2>
                {generatedContent && (
                  <Button onClick={copyToClipboard} variant="outline" className="border-white/10 hover:bg-white/10">
                    Copy
                  </Button>
                )}
              </div>
              <div className="prose prose-invert max-w-none">
                {isGenerating ? (
                  <div className="text-center text-white/60 min-h-[200px] flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Generating content...
                  </div>
                ) : generatedContent ? (
                  <div className="bg-white/5 p-4 rounded-lg min-h-[200px] whitespace-pre-wrap text-white/90">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="text-center text-white/60 min-h-[200px] flex items-center justify-center">
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

