import { useState } from "react";
import { Home, Mail, BookText, Share2, Type, Sparkles, Globe, History, Image, Info, Phone } from "lucide-react";
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
import { getTranslation } from "@/utils/translations";
import HomePage from "@/components/HomePage";

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
    { value: "hindi", label: "हिन्दी (Hindi)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "malayalam", label: "മലയാളം (Malayalam)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
  ];

  const translations: { [key: string]: { [key: string]: string } } = {
    "email": {
      "english": "Email Generation",
      "hindi": "ईमेल जनरेशन",
      "telugu": "ఇమెయిల్ జనరేషన్",
      // Add translations for other languages
    },
    "essay": {
      "english": "Essay Writing",
      "hindi": "निबंध लेखन",
      "telugu": "వ్యాస రచన",
      // Add translations for other languages
    },
    // Add translations for other content types
  };

  const getTranslation = (key: string) => {
    return translations[key]?.[selectedLanguage] || translations[key]?.["english"] || key;
  };

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
    <div className="min-h-screen bg-[#141414] p-8 relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/90 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-8">
            <Button variant="ghost" className="text-white gap-2">
              <Home className="w-5 h-5" />
              {getTranslation("navigation", "home", selectedLanguage)}
            </Button>
            
            <Button variant="ghost" className="text-white gap-2">
              <Sparkles className="w-5 h-5" />
              {getTranslation("navigation", "generations", selectedLanguage)}
            </Button>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder={getTranslation("navigation", "language", selectedLanguage)} />
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
                <Button variant="ghost" className="gap-2">
                  <History className="w-4 h-4" />
                  {getTranslation("navigation", "history", selectedLanguage)}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{getTranslation("navigation", "searchHistory", selectedLanguage)}</SheetTitle>
                  <SheetDescription>
                    {getTranslation("navigation", "recentRequests", selectedLanguage)}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  {searchHistory.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5">
                      <div className="font-medium text-white">{getTranslation(item.type)}</div>
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
                <Button variant="ghost" className="gap-2">
                  <Info className="w-4 h-4" />
                  {getTranslation("navigation", "contact", selectedLanguage)}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{getTranslation("navigation", "contactInfo", selectedLanguage)}</SheetTitle>
                  <SheetDescription>
                    {getTranslation("navigation", "contactDescription", selectedLanguage)}
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto pt-20"
      >
        {!selectedType ? (
          <HomePage selectedLanguage={selectedLanguage} />
        ) : null}

        {!selectedType ? (
          <>
            <div className="grid grid-cols-3 gap-6 mb-6">
              {contentTypes.slice(0, 3).map((type) => (
                <ContentTypeCard
                  key={type.id}
                  title={getTranslation("content", type.id, selectedLanguage)}
                  description={getTranslation("content", `${type.id}Desc`, selectedLanguage)}
                  icon={type.icon}
                  onClick={() => setSelectedType(type.id)}
                  isSelected={selectedType === type.id}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              {contentTypes.slice(3).map((type) => (
                <ContentTypeCard
                  key={type.id}
                  title={getTranslation("content", type.id, selectedLanguage)}
                  description={getTranslation("content", `${type.id}Desc`, selectedLanguage)}
                  icon={type.icon}
                  onClick={() => setSelectedType(type.id)}
                  isSelected={selectedType === type.id}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">
                  {getTranslation(selectedType)}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedType(null)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  {getTranslation("changeType")}
                </Button>
              </div>
              <ContentForm type={selectedType} onSubmit={handleFormSubmit} />
            </div>

            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">{getTranslation("generatedContent")}</h2>
                {generatedContent && (
                  <Button onClick={copyToClipboard} variant="outline" className="border-white/10 hover:bg-white/10">
                    {getTranslation("copy")}
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
                    {getTranslation("generating")}
                  </div>
                ) : generatedContent ? (
                  <div className="bg-white/5 p-4 rounded-lg min-h-[200px] whitespace-pre-wrap text-white/90">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="text-center text-white/60 min-h-[200px] flex items-center justify-center">
                    {getTranslation("generatedContentPlaceholder")}
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
