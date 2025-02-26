
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface RunwareImage {
  imageURL: string;
  positivePrompt: string;
  seed: number;
  NSFWContent: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    
    if (!prompt) {
      throw new Error('Prompt is required')
    }

    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          taskType: 'authentication',
          apiKey: 'nJuJASIiqiDH9XxeZb99jzDAFerUi0c6'
        },
        {
          taskType: 'imageInference',
          taskUUID: crypto.randomUUID(),
          positivePrompt: prompt,
          width: 1024,
          height: 1024,
          model: 'runware:100@1',
          numberResults: 1,
          outputFormat: 'WEBP',
          CFGScale: 1,
          scheduler: 'FlowMatchEulerDiscreteScheduler',
          strength: 0.8,
        }
      ])
    })

    const data = await response.json()
    
    if (data.error || data.errors) {
      throw new Error(data.error || data.errors[0]?.message || 'Failed to generate image')
    }

    const imageResult = data.data.find((item: any) => item.taskType === 'imageInference')
    if (!imageResult || !imageResult.imageURL) {
      throw new Error('No image was generated')
    }

    return new Response(
      JSON.stringify({ imageUrl: imageResult.imageURL }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
