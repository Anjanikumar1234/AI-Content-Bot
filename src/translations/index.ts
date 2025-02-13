
export type TranslationKey =
  | "emailGeneration"
  | "emailDesc"
  | "essayWriting"
  | "essayDesc"
  | "socialMedia"
  | "socialDesc"
  | "textGeneration"
  | "textDesc"
  | "imageGeneration"
  | "imageDesc"
  | "generateContent"
  | "contentLength"
  | "imageStyle"
  | "imageDescription"
  | "selectStyle"
  | "selectLength"
  | "enterContent"
  | "history"
  | "contact"
  | "searchHistory"
  | "recentRequests"
  | "selectLanguage"
  | "error"
  | "errorDesc"
  | "success"
  | "successDesc";

export const translations: Record<string, Record<TranslationKey, string>> = {
  english: {
    emailGeneration: "Email Generation",
    emailDesc: "Create professional and personalized emails",
    essayWriting: "Essay Writing",
    essayDesc: "Generate well-structured essays",
    socialMedia: "Social Media",
    socialDesc: "Create engaging social media content",
    textGeneration: "Text Generation",
    textDesc: "Generate various types of text content",
    imageGeneration: "Image Generation",
    imageDesc: "Create stunning AI-generated images",
    generateContent: "Generate Content",
    contentLength: "Content Length",
    imageStyle: "Image Style",
    imageDescription: "Image Description",
    selectStyle: "Select style",
    selectLength: "Select length",
    enterContent: "Enter your content or prompt here...",
    history: "History",
    contact: "Contact",
    searchHistory: "Search History",
    recentRequests: "Your recent content generation requests",
    selectLanguage: "Select language",
    error: "Error",
    errorDesc: "Failed to generate content. Please try again.",
    success: "Success!",
    successDesc: "Your content has been generated.",
  },
  hindi: {
    emailGeneration: "ईमेल जनरेशन",
    emailDesc: "पेशेवर और व्यक्तिगत ईमेल बनाएं",
    essayWriting: "निबंध लेखन",
    essayDesc: "अच्छी तरह से संरचित निबंध बनाएं",
    socialMedia: "सोशल मीडिया",
    socialDesc: "आकर्षक सोशल मीडिया कंटेंट बनाएं",
    textGeneration: "टेक्स्ट जनरेशन",
    textDesc: "विभिन्न प्रकार की टेक्स्ट सामग्री बनाएं",
    imageGeneration: "छवि जनरेशन",
    imageDesc: "AI द्वारा बनाई गई आकर्षक छवियां बनाएं",
    generateContent: "सामग्री बनाएं",
    contentLength: "सामग्री की लंबाई",
    imageStyle: "छवि शैली",
    imageDescription: "छवि विवरण",
    selectStyle: "शैली चुनें",
    selectLength: "लंबाई चुनें",
    enterContent: "अपनी सामग्री या प्रॉम्प्ट यहां दर्ज करें...",
    history: "इतिहास",
    contact: "संपर्क",
    searchHistory: "खोज इतिहास",
    recentRequests: "आपके हाल के कंटेंट जनरेशन अनुरोध",
    selectLanguage: "भाषा चुनें",
    error: "त्रुटि",
    errorDesc: "सामग्री बनाने में विफल। कृपया पुनः प्रयास करें।",
    success: "सफलता!",
    successDesc: "आपकी सामग्री बन गई है।",
  },
  telugu: {
    emailGeneration: "ఇమెయిల్ జనరేషన్",
    emailDesc: "వృత్తిపరమైన మరియు వ్యక్తిగత ఇమెయిల్‌లను సృష్టించండి",
    essayWriting: "వ్యాస రచన",
    essayDesc: "బాగా నిర్మించబడిన వ్యాసాలను సృష్టించండి",
    socialMedia: "సోషల్ మీడియా",
    socialDesc: "ఆకర్షణీయమైన సోషల్ మీడియా కంటెంట్‌ను సృష్టించండి",
    textGeneration: "టెక్స్ట్ జనరేషన్",
    textDesc: "వివిధ రకాల టెక్స్ట్ కంటెంట్‌ను సృష్టించండి",
    imageGeneration: "చిత్ర జనరేషన్",
    imageDesc: "AI తో అద్భుతమైన చిత్రాలను సృష్టించండి",
    generateContent: "కంటెంట్ సృష్టించండి",
    contentLength: "కంటెంట్ పొడవు",
    imageStyle: "చిత్రం శైలి",
    imageDescription: "చిత్రం వివరణ",
    selectStyle: "శైలిని ఎంచుకోండి",
    selectLength: "పొడవును ఎంచుకోండి",
    enterContent: "మీ కంటెంట్ లేదా ప్రాంప్ట్‌ని ఇక్కడ నమోదు చేయండి...",
    history: "చరిత్ర",
    contact: "సంప్రదించండి",
    searchHistory: "శోధన చరిత్ర",
    recentRequests: "మీ ఇటీవలి కంటెంట్ జనరేషన్ అభ్యర్థనలు",
    selectLanguage: "భాషను ఎంచుకోండి",
    error: "లోపం",
    errorDesc: "కంటెంట్ సృష్టించడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    success: "విజయం!",
    successDesc: "మీ కంటెంట్ సృష్టించబడింది.",
  },
  // Add other Indian languages here with their translations
};

export const useTranslation = (language: string) => {
  return (key: TranslationKey) => {
    return translations[language]?.[key] || translations.english[key];
  };
};
