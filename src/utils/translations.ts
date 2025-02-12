
export const translations = {
  "navigation": {
    "english": {
      "home": "Home",
      "generations": "Generations",
      "history": "History",
      "contact": "Contact",
      "language": "Language"
    },
    "hindi": {
      "home": "होम",
      "generations": "जनरेशन्स",
      "history": "इतिहास",
      "contact": "संपर्क",
      "language": "भाषा"
    },
    "telugu": {
      "home": "హోమ్",
      "generations": "జెనరేషన్స్",
      "history": "చరిత్ర",
      "contact": "సంప్రదించండి",
      "language": "భాష"
    }
    // Add other language translations
  },
  "content": {
    "english": {
      "title": "AI-Powered Content Generation",
      "subtitle": "Generate Any Content with AI",
      "description": "Transform your ideas into powerful content with our AI assistant. Create emails, essays, social media posts, and more in multiple Indian languages.",
      "email": "Email Generation",
      "essay": "Essay Writing",
      "social": "Social Media",
      "text": "Text Generation",
      "image": "Image Generation",
      "emailDesc": "Professional emails crafted for any purpose",
      "essayDesc": "Well-structured essays on any topic",
      "socialDesc": "Engaging social media content",
      "textDesc": "Creative text content generation",
      "imageDesc": "AI-generated visuals from text",
      "introTitle": "Welcome to Next-Gen Content Creation",
      "introDesc": "Our AI-powered platform helps you create various types of content effortlessly. From professional emails to creative essays, social media posts to stunning images - all in your preferred Indian language.",
      "features": "Key Features",
      "feature1": "Multiple Indian Language Support",
      "feature2": "Professional Content Generation",
      "feature3": "AI-Powered Image Creation",
      "feature4": "Smart Content Suggestions"
    },
    "hindi": {
      "title": "एआई-संचालित कंटेंट जनरेशन",
      "subtitle": "एआई के साथ कोई भी कंटेंट जनरेट करें",
      "description": "हमारे एआई असिस्टेंट के साथ अपने विचारों को शक्तिशाली कंटेंट में बदलें। कई भारतीय भाषाओं में ईमेल, निबंध, सोशल मीडिया पोस्ट और बहुत कुछ बनाएं।",
      "email": "ईमेल जनरेशन",
      "essay": "निबंध लेखन",
      "social": "सोशल मीडिया",
      "text": "टेक्स्ट जनरेशन",
      "image": "इमेज जनरेशन",
      "emailDesc": "किसी भी उद्देश्य के लिए पेशेवर ईमेल",
      "essayDesc": "किसी भी विषय पर अच्छी तरह से संरचित निबंध",
      "socialDesc": "आकर्षक सोशल मीडिया कंटेंट",
      "textDesc": "क्रिएटिव टेक्स्ट कंटेंट जनरेशन",
      "imageDesc": "टेक्स्ट से एआई-जनरेटेड विजुअल",
      "introTitle": "नेक्स्ट-जेन कंटेंट क्रिएशन में आपका स्वागत है",
      "introDesc": "हमारा एआई-पावर्ड प्लेटफॉर्म आपको आसानी से विभिन्न प्रकार की सामग्री बनाने में मदद करता है। पेशेवर ईमेल से लेकर रचनात्मक निबंध, सोशल मीडिया पोस्ट से लेकर आकर्षक छवियों तक - सब कुछ आपकी पसंदीदा भारतीय भाषा में।",
      "features": "मुख्य विशेषताएं",
      "feature1": "कई भारतीय भाषाओं का समर्थन",
      "feature2": "पेशेवर कंटेंट जनरेशन",
      "feature3": "एआई-पावर्ड इमेज क्रिएशन",
      "feature4": "स्मार्ट कंटेंट सुझाव"
    }
    // Add other language translations
  }
};

export const getTranslation = (category: "navigation" | "content", key: string, language: string) => {
  return translations[category]?.[language]?.[key] || translations[category]?.["english"]?.[key] || key;
};
