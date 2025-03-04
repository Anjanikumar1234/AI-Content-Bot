import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const generateContent = async (prompt: string) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log('Checking API key...', apiKey ? 'API key exists' : 'No API key found');
    
    // Additional validation for API key format
    if (!apiKey || apiKey === 'YOUR-API-KEY-HERE' || !apiKey.startsWith('AIzaSy')) {
      throw new Error('Invalid Gemini API key format. Please make sure you have added a valid API key in vite.config.ts');
    }

    // Initialize the Gemini API
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    console.log('Generating content with prompt:', prompt);
    
    // Start the generation
    const formattedPrompt = `${prompt}. Please provide a clear and detailed description.`;
    const result = await model.generateContent(formattedPrompt);

    console.log('Generation completed, processing response...');
    const response = await result.response;
    const text = response.text().replace(/[*]/g, ''); // Remove unnecessary symbols
    const formattedText = formatGeneratedText(text); // Format the output

    console.log('Content generated successfully');
    return formattedText;
  } catch (error) {
    console.error('Detailed error in generate function:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate content: ${error.message}`);
    }
    throw error;
  }
};

// Function to format the generated text
const formatGeneratedText = (text) => {
    const emojiMapping = {
        "happy": "😊",
        "sad": "😢",
        "love": "❤️",
        "success": "🎉",
        "warning": "⚠️",
        "info": "ℹ️",
        "question": "❓",
        "idea": "💡",
        "rocket": "🚀",
        "check": "✅",
        "cross": "❌",
        "data": "📊",
        "compare": "🔄",
        "explain": "📝",
        "alert": "🚨",
        "note": "🗒️",
    };

    let selectedEmoji = "ℹ️"; // Default emoji
    if (text.includes("compare")) {
        selectedEmoji = emojiMapping["compare"];
    } else if (text.includes("data")) {
        selectedEmoji = emojiMapping["data"];
    } else if (text.includes("success")) {
        selectedEmoji = emojiMapping["success"];
    }
    return `${selectedEmoji} ${text.trim()}`; // Neatly structure the output
}
