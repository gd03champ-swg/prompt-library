
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, prompts } = await req.json();
    
    if (!query || !query.trim()) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Searching prompts with query: ${query}`);
    console.log(`Number of prompts to search: ${prompts?.length || 'No prompts provided'}`);

    // If no prompts provided, return empty results
    if (!prompts || prompts.length === 0) {
      return new Response(
        JSON.stringify({ results: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare system prompt for Gemini
    const systemPrompt = `
      You are an AI specialized in finding the most relevant prompts based on a user's query.
      Your task is to analyze the query and rank the provided prompts by relevance.
      For each prompt, consider:
      1. How well it addresses the user's intent
      2. Semantic similarity to the query
      3. Whether it covers similar use cases
      
      ONLY return the IDs of the most relevant prompts, ordered from most to least relevant.
      Return at most 5 results.
    `;

    // Format prompts for the AI
    const promptsList = prompts.map(p => 
      `ID: ${p.id}
      Team: ${p.teamName}
      Use Case: ${p.useCase}
      Prompt: ${p.prompt}`
    ).join('\n\n');

    // Make request to Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { text: `USER QUERY: ${query}\n\nAVAILABLE PROMPTS:\n${promptsList}\n\nReturn only the IDs of the most relevant prompts, separated by commas. For example: "1,5,3,2,4"` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 100,
        }
      }),
    });

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data));

    // Extract the result text from Gemini's response
    const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Raw result text:", resultText);

    // Extract IDs from the result
    const idMatches = resultText.match(/\d+/g) || [];
    const relevantIds = [...new Set(idMatches)].map(Number);
    console.log("Extracted relevant IDs:", relevantIds);

    // Filter and order prompts by the relevant IDs
    const results = relevantIds
      .map(id => prompts.find(p => p.id === id))
      .filter(Boolean);
    
    console.log(`Returning ${results.length} results`);
    
    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in search-prompts function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
