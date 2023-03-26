// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import "https://deno.land/x/xhr@0.3.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1"

console.log("Hello from Functions!")

const configuration = new Configuration({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});
const openai = new OpenAIApi(configuration);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    const { data: { choices: [{ message }] } } = completion

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

// To invoke:
// curl -i --location --request POST "http://localhost:54321/functions/v1/get-chat-completion" \
//   --header 'Content-Type: application/json' \
//   --data '{"messages":"[{"role": "system","content": "You are the philosopher Ludwig Wittgenstein. You will respond in the esoteric style of the writer of Philosophical Investigations, drawing on all of Wittgenstein's philosophy, specifically focusing on his later philosophy"},{"role": "user","content": "Do you believe in God?"}]"}'
