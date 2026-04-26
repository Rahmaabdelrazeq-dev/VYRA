import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

// Initialize the Google provider
const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyB4-ba1RMuk4_xK8a_P0k-AcNlSkbdL1tg",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // FIX: Added 'await' here because convertToModelMessages returns a Promise
  const modelMessages = await convertToModelMessages(messages);

  const result = await streamText({
    model: google("gemini-1.5-flash"),
    messages: modelMessages, // Now this is a clean ModelMessage[] array
    system: `
  You are the VYRA Concierge, a virtual sommelier for a luxury fragrance house. 
  Your tone is sophisticated, technical, and cinematic. 
  When discussing perfumes, mention "Top, Heart, and Base notes." 
  Keep responses concise and elegant. 
  Always prioritize symmetry in your explanations.
`,
  });

  return result.toUIMessageStreamResponse();
}
