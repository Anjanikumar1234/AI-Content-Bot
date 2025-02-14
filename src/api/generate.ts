
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const generateContent = async (prompt: string) => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please add your API key in the project settings.');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are a professional content generator specializing in creating high-quality content in multiple languages.
                     You excel at:
                     - Writing emails with appropriate tone and structure
                     - Generating essays of various types and lengths
                     - Creating engaging social media content for different platforms
                     - Describing images in detail for AI generation
                     - General text generation and adaptation
                     
                     When generating content in non-English languages, you create content directly in that language
                     rather than translating from English, ensuring natural and culturally appropriate content.`
          },
          { role: 'user', content: prompt }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate content');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let content = '';

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          
          try {
            const parsed = JSON.parse(data);
            const textChunk = parsed.choices[0]?.delta?.content || '';
            content += textChunk;
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    }

    return content;
  } catch (error) {
    console.error('Error in generate function:', error);
    throw error;
  }
};
