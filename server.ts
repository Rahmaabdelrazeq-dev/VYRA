import express, { Request, Response } from "express";
import cors from "cors";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

const app = express();
app.use(cors());
app.use(express.json());

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyB4-ba1RMuk4_xK8a_P0k-AcNlSkbdL1tg",
});

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      // 2026 Stable Alias: This automatically points to the newest working free model
      model: google("gemini-flash-latest"),
      messages: modelMessages,
      system: "You are the VYRA Concierge. Speak with professional elegance.",
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    result.pipeUIMessageStreamToResponse(res);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("❌ GOOGLE API ERROR:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(3001, () => {
  console.log("✅ Server alive at http://localhost:3001");
});
