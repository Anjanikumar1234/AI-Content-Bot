import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to modify prompts to avoid content filtering
const modifyPromptForImageGeneration = (prompt: string): string => {
  // Convert to lowercase for easier matching
  const lowerPrompt = prompt.toLowerCase();
  
  // If the prompt contains food-related terms, make it more neutral
  if (lowerPrompt.includes('breakfast') || 
      lowerPrompt.includes('food') || 
      lowerPrompt.includes('cooking') ||
      lowerPrompt.includes('recipe')) {
    return `A kitchen scene of ${prompt}`;
  }
  
  return prompt;
};

// Function to format text in a clean, structured way
const formatStructuredText = (text: string): string => {
  // Remove any markdown and special characters
  let formattedText = text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/```/g, '')
    .replace(/`/g, '');

  // Format lists with proper indentation and spacing
  formattedText = formattedText
    .replace(/^\s*[\*\-]\s+/gm, '\n• ') // Convert list items with proper spacing
    .replace(/^\d+\.\s+/gm, (match) => `\n${match}`); // Add spacing before numbered lists

  // Add proper paragraph spacing
  formattedText = formattedText
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .replace(/\n\s*\n/g, '\n\n') // Standardize paragraph spacing
    .replace(/([.!?])\s+/g, '$1\n') // Add line breaks after sentences
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0) // Remove empty lines
    .join('\n\n');

  // Clean up final formatting
  return formattedText
    .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
    .replace(/^\s+|\s+$/g, '') // Trim extra whitespace
    .trim();
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
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // First, show the current date/time immediately
      const initialResponse = `Current Date and Time:\n\nDate: ${now.toLocaleDateString()}\nTime: ${now.toLocaleTimeString()}\nDay: ${now.toLocaleDateString(undefined, { weekday: 'long' })}\n\nFetching additional information...`;
      onStream(initialResponse);

      // Then get AI's enhanced response
      const result = await model.generateContentStream(formattedPrompt);
      let fullText = initialResponse + '\n\n';
      let buffer = '';
      
      for await (const chunk of result.stream) {
        buffer += chunk.text();
        
        // Format the text when we have a complete sentence or paragraph
        if (buffer.match(/[.!?]\s*$/) || buffer.includes('\n')) {
          fullText += formatStructuredText(buffer);
          buffer = '';
          onStream(fullText);
        }
      }
      
      // Format any remaining text
      if (buffer) {
        fullText += formatStructuredText(buffer);
        onStream(fullText);
      }

      return fullText;
    }

    // Rest of the code for non-date queries
    const modifiedPrompt = modifyPromptForImageGeneration(prompt);
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    console.log('Generating content with prompt:', modifiedPrompt);
    
    const result = await model.generateContentStream(modifiedPrompt);
    let fullText = '';
    let buffer = '';
    let lastChunkTime = Date.now();
    
    for await (const chunk of result.stream) {
      buffer += chunk.text();
      
      // Format the text when we have a complete sentence or paragraph
      if (buffer.match(/[.!?]\s*$/) || buffer.includes('\n')) {
        fullText += formatStructuredText(buffer);
        buffer = '';
        
        const now = Date.now();
        if (now - lastChunkTime >= 50) {
          onStream(fullText);
          lastChunkTime = now;
        }
      }
    }
    
    // Format any remaining text
    if (buffer) {
      fullText += formatStructuredText(buffer);
      onStream(fullText);
    }

    console.log('Content generated successfully');
    return fullText;
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
