import { useState, useEffect } from "react";
import { Mail, BookText, Share2, Type, Sparkles, Globe, History, Image, Info, Phone } from "lucide-react";
import ContentTypeCard from "@/components/ContentTypeCard";
import ContentForm from "@/components/ContentForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { generateContent, generateImageDescription } from "@/api/generate";
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
import { useTranslation } from "@/translations";

const Index = () => {
  const [showHome, setShowHome] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [searchHistory, setSearchHistory] = useState<Array<{type: string, content: string, timestamp: Date}>>([]);
  const { toast } = useToast();
  const t = useTranslation(selectedLanguage);

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिन्दी" },
    { value: "telugu", label: "తెలుగు" },
    { value: "tamil", label: "தமிழ்" },
    { value: "kannada", label: "ಕನ್ನಡ" },
    { value: "malayalam", label: "മലയാളം" },
  ];

  const contentTypes = [
    {
      id: "email",
      title: t("emailGeneration"),
      description: t("emailDesc"),
      icon: <Mail className="w-8 h-8" />,
    },
    {
      id: "essay",
      title: t("essayWriting"),
      description: t("essayDesc"),
      icon: <BookText className="w-8 h-8" />,
    },
    {
      id: "social",
      title: t("socialMedia"),
      description: t("socialDesc"),
      icon: <Share2 className="w-8 h-8" />,
    },
    {
      id: "text",
      title: t("textGeneration"),
      description: t("textDesc"),
      icon: <Type className="w-8 h-8" />,
    },
    {
      id: "image",
      title: t("imageGeneration"),
      description: t("imageDesc"),
      icon: <Image className="w-8 h-8" />,
    },
  ];

  const generatePrompt = (type: string, data: any) => {
    const languagePrompt = selectedLanguage !== "english" 
      ? `Generate the following directly in ${selectedLanguage} (not translated, but naturally written): ` 
      : "";
    
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
        title: t("error"),
        description: t("errorDesc"),
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");
    
    try {
      const prompt = generatePrompt(selectedType!, data);
      
      // Use generateImageDescription for image requests, generateContent for others
      if (selectedType === "image") {
        await generateImageDescription(prompt, (streamedText) => {
          setGeneratedContent(streamedText);
        });
      } else {
        await generateContent(prompt, (streamedText) => {
          setGeneratedContent(streamedText);
        });
      }
      
      setSearchHistory(prev => [...prev, {
        type: selectedType!,
        content: data.content,
        timestamp: new Date()
      }]);
      
      toast({
        title: t("success"),
        description: t("successDesc"),
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: t("error"),
        description: t("errorDesc"),
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
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"
        style={{
          transform: "perspective(1000px) rotateX(2deg)",
          backgroundSize: "50px 50px",
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-white/5 pointer-events-none" />
      
      <AnimatePresence>
        {showHome ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative z-10 h-screen flex flex-col items-center justify-center"
          >
            <h1 className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
              AI Content Generator
            </h1>
            <p className="text-xl text-white/60 mb-12 max-w-2xl text-center">
              Create authentic content in multiple Indian languages using advanced AI technology
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHome(false)}
              className="px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full text-white font-semibold hover:bg-white/20 transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto relative"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                    <Globe className="w-4 h-4 mr-2" />
                    <SelectValue placeholder={t("selectLanguage")} />
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
                      {t("history")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>{t("searchHistory")}</SheetTitle>
                      <SheetDescription>
                        {t("recentRequests")}
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
                      {t("contact")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>{t("contactInfo")}</SheetTitle>
                      <SheetDescription>
                        {t("contactDesc")}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-3 grid grid-cols-3 gap-6">
                  {contentTypes.slice(0, 3).map((type) => (
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
                <div className="col-span-3 flex justify-center gap-6">
                  {contentTypes.slice(3).map((type) => (
                    <div key={type.id} className="w-1/3">
                      <ContentTypeCard
                        title={type.title}
                        description={type.description}
                        icon={type.icon}
                        onClick={() => setSelectedType(type.id)}
                        isSelected={selectedType === type.id}
                      />
                    </div>
                  ))}
                </div>
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
                  <ContentForm 
                    type={selectedType} 
                    onSubmit={handleFormSubmit}
                    language={selectedLanguage} 
                  />
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
                        {generatedContent.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
