import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to create a detailed image description prompt
const createImageDescriptionPrompt = (userPrompt) => {
  // Check if the prompt contains potentially sensitive content
  const lowerPrompt = userPrompt.toLowerCase();
  const sensitiveTerms = [
    'fighting', 'violence', 'conflict', 'war', 'crime', 'abuse',
    'nude', 'naked', 'sexual', 'explicit'
  ];
  
  const containsSensitiveContent = sensitiveTerms.some(term => lowerPrompt.includes(term));
  
  // For sensitive content, create a more descriptive but less explicit prompt
  if (containsSensitiveContent) {
    return `Generate a detailed, vivid description of a scene that artistically represents: ${userPrompt}. 
Focus on the composition, lighting, colors, and atmosphere rather than explicit details.
Describe the scene in a way that captures the essence and emotion without graphic depictions.
The description should be 3-5 paragraphs long and highly visual but appropriate for all audiences.`;
  }
  
  // For regular content, use the standard prompt
  return `Generate a detailed, vivid description of an image showing: ${userPrompt}. 
Include details about the setting, lighting, colors, composition, and mood. 
Describe what would be visible in the foreground, middle ground, and background.
The description should be 3-5 paragraphs long and highly visual.`;
};

// Function to format text in a clean, structured way
const formatStructuredText = (text) => {
  let formattedText = text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/```/g, '')
    .replace(/`/g, '');

  formattedText = formattedText
    .replace(/^\s*[\*\-]\s+/gm, '\n• ') 
    .replace(/^\d+\.\s+/gm, (match) => `\n${match}`);

  formattedText = formattedText
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .replace(/\n\s*\n/g, '\n\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n\n');

  return formattedText
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s+|\s+$/g, '')
    .trim();
};

// Function specifically for generating image descriptions
export const generateImageDescription = async (prompt, onStream) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log('Checking API key...', apiKey ? 'API key exists' : 'No API key found');
    console.log('Input prompt for image description:', prompt);

    // Create a detailed image description prompt
    const descriptionPrompt = createImageDescriptionPrompt(prompt);
    console.log('Image description prompt:', descriptionPrompt);

    if (!apiKey || apiKey === 'YOUR-API-KEY-HERE' || !apiKey.startsWith('AIzaSy')) {
      throw new Error('Invalid Gemini API key format. Please add a valid API key.');
    }

    // Initialize the Gemini API
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      // Set safety settings to be more permissive
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        }
      ]
    });

    // Generate content
    const result = await model.generateContentStream(descriptionPrompt);
    let fullText = '';
    let buffer = '';

    for await (const chunk of result.stream) {
      buffer += chunk.text();

      if (buffer.includes('\n\n') || buffer.match(/[.!?]\s*$/) && buffer.length > 100) {
        fullText += formatStructuredText(buffer);
        buffer = '';
        onStream(fullText);
      }
    }

    if (buffer) {
      fullText += formatStructuredText(buffer);
      onStream(fullText);
    }

    console.log('Image description generated successfully');
    console.log('Generated output:', fullText);

    return fullText;
  } catch (error) {
    console.error('Error generating image description:', error);

    // If there's still a policy violation, try to generate a more generic response
    if (error.message.includes('violates the policy')) {
      console.log('Policy violation detected, attempting to generate alternative content');
      
      // Create a more generic version of the prompt
      const genericPrompt = `Generate a detailed description of a professional scene that represents: ${prompt.replace(/working woman|woman|man|child|person/gi, 'professional')}`;
      
      try {
        // Try again with the generic prompt
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-2.0-flash',
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
            }
          ]
        });
        
        const result = await model.generateContent(genericPrompt);
        const text = result.response.text();
        onStream(text);
        return text;
      } catch (secondError) {
        console.error('Second attempt also failed:', secondError);
        // If all else fails, return a default response
        const fallbackResponse = "A professional office environment with modern furnishings. The space is well-lit with natural light streaming through large windows. A desk with neatly organized documents and a computer sits in the foreground. The color palette consists of neutral tones with subtle accents of blue, creating a calm and productive atmosphere.";
        onStream(fallbackResponse);
        return fallbackResponse;
      }
    }

    throw error;
  }
};

// Main function to generate general content (not image descriptions)
export const generateContent = async (prompt, onStream) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log('Checking API key...', apiKey ? 'API key exists' : 'No API key found');
    console.log('Input prompt for general content:', prompt);

    if (!apiKey || apiKey === 'YOUR-API-KEY-HERE' || !apiKey.startsWith('AIzaSy')) {
      throw new Error('Invalid Gemini API key format. Please add a valid API key.');
    }

    // Initialize the Gemini API
    console.log('Initializing Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Generate content
    const result = await model.generateContentStream(prompt);
    let fullText = '';
    let buffer = '';

    for await (const chunk of result.stream) {
      buffer += chunk.text();

      if (buffer.includes('\n\n') || buffer.match(/[.!?]\s*$/) && buffer.length > 100) {
        fullText += formatStructuredText(buffer);
        buffer = '';
        onStream(fullText);
      }
    }

    if (buffer) {
      fullText += formatStructuredText(buffer);
      onStream(fullText);
    }

    console.log('Content generated successfully');
    console.log('Generated output:', fullText);

    return fullText;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

// Function to format the generated text with emojis
const formatGeneratedText = (text) => {
  const emojiMapping = {
    happy: "😊",
    sad: "😢",
    love: "❤️",
    success: "🎉",
    warning: "⚠️",
    info: "ℹ️",
    question: "❓",
    idea: "💡",
    rocket: "🚀",
    check: "✅",
    cross: "❌",
    data: "📊",
    compare: "🔄",
    explain: "📝",
    alert: "🚨",
    note: "🗒️",
  };

  let selectedEmoji = "ℹ️";
  if (text.includes("compare")) {
    selectedEmoji = emojiMapping["compare"];
  } else if (text.includes("data")) {
    selectedEmoji = emojiMapping["data"];
  } else if (text.includes("success")) {
    selectedEmoji = emojiMapping["success"];
  }

  return `${selectedEmoji} ${text.trim()}`;
};

// Example usage for image description
const imagePrompt = "working woman";
generateImageDescription(imagePrompt, (text) => {
  console.log('Streaming image description:', text);
}).then((finalOutput) => {
  console.log('Final image description:', finalOutput);
}).catch((error) => {
  console.error('Error:', error);
});
