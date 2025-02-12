
export const translations = {
  "navigation": {
    "english": {
      "home": "Home",
      "generations": "Generations",
      "history": "History",
      "contact": "Contact",
      "language": "Language",
      "searchHistory": "Search History",
      "recentRequests": "Your recent requests",
      "contactInfo": "Contact Information",
      "contactDescription": "Get in touch for support or queries"
    },
    "hindi": {
      "home": "होम",
      "generations": "जनरेशन्स",
      "history": "इतिहास",
      "contact": "संपर्क",
      "language": "भाषा",
      "searchHistory": "खोज इतिहास",
      "recentRequests": "आपके हाल के अनुरोध",
      "contactInfo": "संपर्क जानकारी",
      "contactDescription": "सहायता या प्रश्नों के लिए संपर्क करें"
    }
  },
  "content": {
    "english": {
      "title": "AI-Powered Content Generation",
      "subtitle": "Generate Any Content with AI",
      "description": "Transform your ideas into powerful content with our AI assistant",
      "email": "EMAIL GENERATION",
      "essay": "ESSAY WRITING",
      "social": "SOCIAL MEDIA",
      "text": "TEXT GENERATION",
      "image": "IMAGE GENERATION",
      "introTitle": "Welcome to Next-Gen Content Creation",
      "introDesc": "Our AI-powered platform helps you create various types of content effortlessly",
      "features": "Key Features",
      "feature1": "Multiple Indian Language Support",
      "feature2": "Professional Content Generation",
      "feature3": "AI-Powered Image Creation",
      "feature4": "Smart Content Suggestions",
      "generatedContent": "Generated Content",
      "generating": "Generating...",
      "copy": "Copy",
      "changeType": "Change Type",
      "generatedContentPlaceholder": "Your generated content will appear here"
    },
    "hindi": {
      "title": "एआई-संचालित कंटेंट जनरेशन",
      "subtitle": "एआई के साथ कोई भी कंटेंट जनरेट करें",
      "description": "हमारे एआई असिस्टेंट के साथ अपने विचारों को शक्तिशाली कंटेंट में बदलें",
      "email": "ईमेल जनरेशन",
      "essay": "निबंध लेखन",
      "social": "सोशल मीडिया",
      "text": "टेक्स्ट जनरेशन",
      "image": "इमेज जनरेशन"
    }
  }
};

export const getTranslation = (key: string, language: string = 'english') => {
  // First try to find in navigation
  const navTranslation = translations.navigation[language]?.[key];
  if (navTranslation) return navTranslation;

  // Then try to find in content
  const contentTranslation = translations.content[language]?.[key];
  if (contentTranslation) return contentTranslation;

  // Fallback to English
  const englishNav = translations.navigation.english[key];
  if (englishNav) return englishNav;

  const englishContent = translations.content.english[key];
  if (englishContent) return englishContent;

  // If no translation found, return the key
  return key;
};
