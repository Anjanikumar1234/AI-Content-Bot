
import { corsHeaders } from '../_shared/cors.ts'
import { GoogleGenerativeAI } from 'npm:@google/generative-ai'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, type = 'text' } = await req.json()
    
    if (!prompt) {
      throw new Error('Prompt is required')
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      throw new Error('Gemini API key not configured')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Create type-specific real-time context
    let enhancedPrompt = ''
    const currentDate = new Date().toLocaleDateString()
    
    switch (type) {
      case 'email':
        enhancedPrompt = `As of ${currentDate}, write a contextually relevant email that incorporates any recent developments or current events related to: ${prompt}. Include relevant industry trends or news if applicable.`
        break
      case 'essay':
        enhancedPrompt = `Write an essay that analyzes ${prompt} with the most up-to-date information as of ${currentDate}. Include recent developments, current statistics, and contemporary examples. If discussing evolving topics, mention the latest trends and changes.`
        break
      case 'social':
        enhancedPrompt = `Create a social media post about ${prompt} that's relevant to today (${currentDate}). Include current hashtags, trends, and timely references. Consider ongoing events and recent developments in this field.`
        break
      default:
        enhancedPrompt = `Please provide comprehensive, up-to-date information about: ${prompt}\n\nInclude:\n1. Latest developments and current events as of ${currentDate}\n2. Recent statistics and data\n3. Contemporary examples and references\n4. Current trends and future projections\n\nIf any information might not be current, please indicate this in your response.`
    }

    const result = await model.generateContent(enhancedPrompt)
    const response = await result.response
    const text = response.text()

    return new Response(
      JSON.stringify({ text }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in generate-text function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
