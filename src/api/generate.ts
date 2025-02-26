
import { GoogleGenerativeAI } from '@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const generateContent = async (prompt: string) => {
  try {
    // First try Perplexity API
    const storedApiKey = localStorage.getItem('PERPLEXITY_API_KEY');
    
    if (!storedApiKey) {
      // If no API key is stored, ask user to input it
      const apiKey = window.prompt('Please enter your Perplexity API key (get one for free at https://www.perplexity.ai):');
      if (apiKey) {
        localStorage.setItem('PERPLEXITY_API_KEY', apiKey);
      } else {
        // Fallback to Gemini if user doesn't provide Perplexity key
        return generateWithGemini(prompt);
      }
    }

    console.log('Using Perplexity API for real-time responses...');
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${storedApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides up-to-date information through real-time web search capabilities.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_domain_filter: ['perplexity.ai'],
        search_recency_filter: 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    const data = await response.json();
    if (data.error) {
      console.log('Falling back to Gemini due to Perplexity error:', data.error);
      return generateWithGemini(prompt);
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error with Perplexity, falling back to Gemini:', error);
    return generateWithGemini(prompt);
  }
};

// Fallback function using Gemini
const generateWithGemini = async (prompt: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR-API-KEY-HERE' || !apiKey.startsWith('AIzaSy')) {
    throw new Error('Invalid Gemini API key format. Please make sure you have added a valid API key in vite.config.ts');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const enhancedPrompt = `As of June 2023 (Gemini's training cutoff date): ${prompt}`;
  const result = await model.generateContent(enhancedPrompt);
  const response = await result.response;
  return response.text();
};
