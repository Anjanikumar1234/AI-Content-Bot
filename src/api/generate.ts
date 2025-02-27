
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
  return generateText(prompt, type);
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

const generateText = async (prompt: string, type: string = 'text'): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-text', {
      body: { prompt, type }
    });

    if (error) throw error;
    if (!data?.text) throw new Error('No text content returned');

    return data.text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};
