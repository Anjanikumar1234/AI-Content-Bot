
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from "@/integrations/supabase/client";

interface RunwareImage {
  imageURL: string;
  positivePrompt: string;
  seed: number;
  NSFWContent: boolean;
}

export const generateContent = async (prompt: string, type: string = 'text') => {
  if (type === 'image') {
    return generateImage(prompt);
  }
  return generateWithGemini(prompt, type);
};

const generateImage = async (prompt: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: { prompt }
    });

    if (error) throw error;
    if (!data?.imageUrl) throw new Error('No image URL returned');

    return data.imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

const generateWithGemini = async (prompt: string, type: string = 'text'): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR-API-KEY-HERE' || !apiKey.startsWith('AIzaSy')) {
    throw new Error('Invalid Gemini API key format. Please make sure you have added a valid API key in vite.config.ts');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Create type-specific real-time context
  let enhancedPrompt = '';
  const currentDate = new Date().toLocaleDateString();
  
  switch (type) {
    case 'email':
      enhancedPrompt = `As of ${currentDate}, write a contextually relevant email that incorporates any recent developments or current events related to: ${prompt}. Include relevant industry trends or news if applicable.`;
      break;
    case 'essay':
      enhancedPrompt = `Write an essay that analyzes ${prompt} with the most up-to-date information as of ${currentDate}. Include recent developments, current statistics, and contemporary examples. If discussing evolving topics, mention the latest trends and changes.`;
      break;
    case 'social':
      enhancedPrompt = `Create a social media post about ${prompt} that's relevant to today (${currentDate}). Include current hashtags, trends, and timely references. Consider ongoing events and recent developments in this field.`;
      break;
    default:
      enhancedPrompt = `Please provide comprehensive, up-to-date information about: ${prompt}\n\nInclude:\n1. Latest developments and current events as of ${currentDate}\n2. Recent statistics and data\n3. Contemporary examples and references\n4. Current trends and future projections\n\nIf any information might not be current, please indicate this in your response.`;
  }

  try {
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};
