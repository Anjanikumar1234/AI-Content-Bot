
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
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    console.log('Generating content with prompt:', prompt);
    
    // Start the generation
    const result = await model.generateContent(prompt);
    console.log('Generation completed, processing response...');
    const response = await result.response;
    const text = response.text();
    
    console.log('Content generated successfully');
    return text;
  } catch (error) {
    console.error('Detailed error in generate function:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate content: ${error.message}`);
    }
    throw error;
  }
};

