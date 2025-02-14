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
  | "successDesc"
  | "contactInfo"
  | "contactDesc";

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
    contactInfo: "Contact Information",
    contactDesc: "Get in touch with us",
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
    contactInfo: "संपर्क जानकारी",
    contactDesc: "हमसे संपर्क करें",
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
    contactInfo: "సంప్రదింపు సమాచారం",
    contactDesc: "మమ్మల్ని సంప్రదించండి",
  },
  tamil: {
    emailGeneration: "மின்னஞ்சல் உருவாக்கம்",
    emailDesc: "தொழில்முறை மற்றும் தனிப்பயனாக்கப்பட்ட மின்னஞ்சல்களை உருவாக்குங்கள்",
    essayWriting: "கட்டுரை எழுதுதல்",
    essayDesc: "நன்கு கட்டமைக்கப்பட்ட கட்டுரைகளை உருவாக்குங்கள்",
    socialMedia: "சமூக ஊடகம்",
    socialDesc: "கவர்ச்சிகரமான சமூக ஊடக உள்ளடக்கத்தை உருவாக்குங்கள்",
    textGeneration: "உரை உருவாக்கம்",
    textDesc: "பல்வேறு வகையான உரை உள்ளடக்கத்தை உருவாக்குங்கள்",
    imageGeneration: "படம் உருவாக்கம்",
    imageDesc: "AI மூலம் அழகான படங்களை உருவாக்குங்கள்",
    generateContent: "உள்ளடக்கத்தை உருவாக்கு",
    contentLength: "உள்ளடக்க நீளம்",
    imageStyle: "பட பாணி",
    imageDescription: "பட விளக்கம்",
    selectStyle: "பாணியைத் தேர்ந்தெடுக்கவும்",
    selectLength: "நீளத்தைத் தேர்ந்தெடுக்கவும்",
    enterContent: "உங்கள் உள்ளடக்கத்தை இங்கே உள்ளிடவும்...",
    history: "வரலாறு",
    contact: "தொடர்பு",
    searchHistory: "தேடல் வரலாறு",
    recentRequests: "உங்கள் சமீபத்திய உள்ளடக்க உருவாக்க கோரிக்கைகள்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    error: "பிழை",
    errorDesc: "உள்ளடக்கத்தை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    success: "வெற்றி!",
    successDesc: "உங்கள் உள்ளடக்கம் உருவாக்கப்பட்டது.",
    contactInfo: "தொடர்பு தகவல்",
    contactDesc: "எங்களை தொடர்பு கொள்ளவும்",
  },
  malayalam: {
    emailGeneration: "ഇമെയിൽ ജനറേഷൻ",
    emailDesc: "പ്രൊഫഷണലും വ്യക്തിഗതവുമായ ഇമെയിലുകൾ സൃഷ്ടിക്കുക",
    essayWriting: "ഉപന്യാസ രചന",
    essayDesc: "നന്നായി ക്രമീകരിച്ച ഉപന്യാസങ്ങൾ സൃഷ്ടിക്കുക",
    socialMedia: "സോഷ്യൽ മീഡിയ",
    socialDesc: "ആകർഷകമായ സോഷ്യൽ മീഡിയ ഉള്ളടക്കം സൃഷ്ടിക്കുക",
    textGeneration: "ടെക്സ്റ്റ് ജനറേഷൻ",
    textDesc: "വിവിധ തരം ടെക്സ്റ്റ് ഉള്ളടക്കം സൃഷ്ടിക്കുക",
    imageGeneration: "ചിത്ര ജനറേഷൻ",
    imageDesc: "AI ഉപയോഗിച്ച് മനോഹരമായ ചിത്രങ്ങൾ സൃഷ്ടിക്കുക",
    generateContent: "ഉള്ളടക്കം സൃഷ്ടിക്കുക",
    contentLength: "ഉള്ളടക്ക ദൈർഘ്യം",
    imageStyle: "ചിത്ര ശൈലി",
    imageDescription: "ചിത്ര വിവരണം",
    selectStyle: "ശൈലി തിരഞ്ഞെടുക്കുക",
    selectLength: "ദൈർഘ്യം തിരഞ്ഞെടുക്കുക",
    enterContent: "നിങ്ങളുടെ ഉള്ളടക്കം ഇവിടെ നൽകുക...",
    history: "ചരിത്രം",
    contact: "ബന്ധപ്പെടുക",
    searchHistory: "തിരയൽ ചരിത്രം",
    recentRequests: "നിങ്ങളുടെ സമീപകാല ഉള്ളടക്ക ജനറേഷൻ അഭ്യർത്ഥനകൾ",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    error: "പിശക്",
    errorDesc: "ഉള്ളടക്കം സൃഷ്ടിക്കാൻ കഴിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക.",
    success: "വിജയം!",
    successDesc: "നിങ്ങളുടെ ഉള്ളടക്കം സൃഷ്ടിക്കപ്പെട്ടു.",
    contactInfo: "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ",
    contactDesc: "ഞങ്ങളുമായി ബന്ധപ്പെടുക",
  },
  kannada: {
    emailGeneration: "ಇಮೇಲ್ ಜನರೇಷನ್",
    emailDesc: "ವೃತ್ತಿಪರ ಮತ್ತು ವೈಯಕ್ತಿಕ ಇಮೇಲ್‌ಗಳನ್ನು ರಚಿಸಿ",
    essayWriting: "ಪ್ರಬಂಧ ಬರೆಯುವುದು",
    essayDesc: "ಚೆನ್ನಾಗಿ ರಚಿಸಲಾದ ಪ್ರಬಂಧಗಳನ್ನು ರಚಿಸಿ",
    socialMedia: "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ",
    socialDesc: "ಆಕರ್ಷಕ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ವಿಷಯವನ್ನು ರಚಿಸಿ",
    textGeneration: "ಟೆಕ್ಸ್ಟ್ ಜನರೇಷನ್",
    textDesc: "ವಿವಿಧ ರೀತಿಯ ಪಠ್ಯ ವಿಷಯವನ್ನು ರಚಿಸಿ",
    imageGeneration: "ಚಿತ್ರ ಜನರೇಷನ್",
    imageDesc: "AI ಮೂಲಕ ಸುಂದರವಾದ ಚಿತ್ರಗಳನ್ನು ರಚಿಸಿ",
    generateContent: "ವಿಷಯ ರಚಿಸಿ",
    contentLength: "ವಿಷಯದ ಉದ್ದ",
    imageStyle: "ಚಿತ್ರ ಶೈಲಿ",
    imageDescription: "ಚಿತ್ರ ವಿವರಣೆ",
    selectStyle: "ಶೈಲಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    selectLength: "ಉದ್ದವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    enterContent: "ನಿಮ್ಮ ವಿಷಯ ಅಥವಾ ಪ್ರಾಂಪ್ಟ್ ಅನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ...",
    history: "ಇತಿಹಾಸ",
    contact: "ಸಂಪರ್ಕ",
    searchHistory: "ಹುಡುಕಾಟ ಇತಿಹಾಸ",
    recentRequests: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ವಿಷಯ ರಚನೆ ವಿನಂತಿಗಳು",
    selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    error: "ದೋಷ",
    errorDesc: "ವಿಷಯವನ್ನು ರಚಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    success: "ಯಶಸ್ಸು!",
    successDesc: "ನಿಮ್ಮ ವಿಷಯ ರಚಿಸಲಾಗಿದೆ.",
    contactInfo: "ಸಂಪರ್ಕ ಮಾಹಿತಿ",
    contactDesc: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
  }
};

export const useTranslation = (language: string) => {
  return (key: TranslationKey) => {
    return translations[language]?.[key] || translations.english[key];
  };
};
