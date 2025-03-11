import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const generateContent = async (prompt: string, onStream: (text: string) => void) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log('Checking API key...', apiKey ? 'API key exists' : 'No API key found');
    
    // Additional validation for API key format
    if (!apiKey || apiKey === 'YOUR-API-KEY-HERE' || !apiKey.startsWith('AIzaSy')) {
      throw new Error('Invalid Gemini API key format. Please make sure you have added a valid API key in vite.config.ts');
    }

    // Special handling for date/time queries
    if (prompt.toLowerCase().includes('date') || prompt.toLowerCase().includes('time')) {
      const now = new Date();
      const formattedPrompt = `
        Today's date and time information:
        Current Date: ${now.toLocaleDateString()}
        Current Time: ${now.toLocaleTimeString()}
        Day of Week: ${now.toLocaleDateString(undefined, { weekday: 'long' })}
        
        Please provide:
        1. A brief explanation of any significant events or holidays on this date
        2. Historical events that occurred on this date
        3. Any cultural or seasonal significance of this time of year
        Keep the response concise and engaging.
      `;

      // Initialize the Gemini API for enhanced response
      console.log('Initializing Gemini API...');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // First, show the current date/time immediately
      const initialResponse = `Current Date and Time:\n- Date: ${now.toLocaleDateString()}\n- Time: ${now.toLocaleTimeString()}\n- Day: ${now.toLocaleDateString(undefined, { weekday: 'long' })}\n\nFetching additional information...`;
      onStream(initialResponse);

      // Then get AI's enhanced response
      const result = await model.generateContentStream(formattedPrompt);
      let fullText = initialResponse + '\n\n';
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        onStream(fullText);
      }

      return formatGeneratedText(fullText);
    }

    // Initialize the Gemini API for other queries
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    console.log('Generating content with prompt:', prompt);
    
    // Start the generation with streaming
    const formattedPrompt = `${prompt}. Please provide a clear and detailed description.`;
    const result = await model.generateContentStream(formattedPrompt);

    let fullText = '';
    let lastChunkTime = Date.now();
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      
      // Ensure we're not updating the UI too rapidly
      const now = Date.now();
      if (now - lastChunkTime >= 50) { // Add a small delay between updates
        onStream(fullText);
        lastChunkTime = now;
      }
    }
    
    // Ensure the final text is shown
    onStream(fullText);

    console.log('Content generated successfully');
    return formatGeneratedText(fullText);
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
