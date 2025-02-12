import { useState } from "react";
import { Mail, BookText, Share2, Type, Sparkles, Globe, History, Image, Info, Phone } from "lucide-react";
import ContentTypeCard from "@/components/ContentTypeCard";
import ContentForm from "@/components/ContentForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { generateContent } from "@/api/generate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [searchHistory, setSearchHistory] = useState<Array<{type: string, content: string, timestamp: Date}>>([]);
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
    {
      id: "image",
      title: "Image Generation",
      description: "Create stunning AI-generated images",
      icon: <Image className="w-8 h-8" />,
    },
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Español" },
    { value: "french", label: "Français" },
    { value: "german", label: "Deutsch" },
    { value: "italian", label: "Italiano" },
    { value: "portuguese", label: "Português" },
    { value: "russian", label: "Русский" },
    { value: "chinese", label: "中文" },
    { value: "japanese", label: "日本語" },
    { value: "korean", label: "한국어" },
    { value: "arabic", label: "العربية" },
    { value: "hindi", label: "हिन्दी" },
  ];

  const generatePrompt = (type: string, data: any) => {
    const languagePrompt = selectedLanguage !== "english" ? `Translate the following to ${selectedLanguage}: ` : "";
    
    switch (type) {
      case "email":
        return `${languagePrompt}Write a ${data.tone || "professional"} email from ${data.senderName || "sender"} to ${data.receiverName || "receiver"} that is ${data.length || "medium"} in length. Type: ${data.emailType || "compose"}. Content context: ${data.content}`;
      case "essay":
        return `${languagePrompt}Write a ${data.essayType || "simple"} essay that is ${data.length || "medium"} in length about: ${data.content}`;
      case "social":
        return `${languagePrompt}Write a ${data.style || "professional"} social media post for ${data.platform || "LinkedIn"} that is ${data.length || "medium"} in length about: ${data.content}`;
      case "text":
        return `${languagePrompt}${data.textType || "Summarize"} the following text to be ${data.length || "medium"} in length: ${data.content}`;
      case "image":
        return `Create a highly detailed, professional image of: ${data.content}. Style: ${data.imageStyle || "realistic"}. Include these details: ${data.additionalDetails || "none"}`;
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
      
      // Add to history
      setSearchHistory(prev => [...prev, {
        type: selectedType!,
        content: data.content,
        timestamp: new Date()
      }]);
      
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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#000000] p-8 relative overflow-hidden">
      {/* Animated background grid with perspective */}
      <div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"
        style={{
          transform: "perspective(1000px) rotateX(2deg)",
          backgroundSize: "50px 50px",
        }}
      />
      
      {/* Dynamic lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-white/5 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto relative"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <History className="w-4 h-4" />
                  History
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Search History</SheetTitle>
                  <SheetDescription>
                    Your recent content generation requests
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {searchHistory.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5">
                      <div className="font-medium text-white">{item.type}</div>
                      <div className="text-sm text-white/60 mt-1">{item.content}</div>
                      <div className="text-xs text-white/40 mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Info className="w-4 h-4" />
                  Contact
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Contact Information</SheetTitle>
                  <SheetDescription>
                    Get in touch for support or queries
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:pallapoluanjanikumar@gmail.com" className="text-blue-400 hover:underline">
                      pallapoluanjanikumar@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a href="tel:+918125436681" className="text-blue-400 hover:underline">
                      +91 8125436681
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-lg"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm text-white/80">AI-Powered Content Generation</span>
          </motion.div>
          
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
            Personalized Content Generator
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
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
