
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text, length, customWordLimit } = req.body;

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    
    let targetWords = 25; 
    if (customWordLimit && Number(customWordLimit) > 0) {
      targetWords = Number(customWordLimit); 
    } else if (length === "medium") {
      targetWords = 50;
    } else if (length === "detailed") {
      targetWords = 100;
    }

    
    const cleanText = text
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a precise summarizer. Read the full article as a single piece and summarize it in ONE paragraph of about ${targetWords} words. Do NOT use bullet points, lists, or headings.`,
        },
        {
          role: "user",
          content: `Article:\n${cleanText}\n\nSummarize in about ${targetWords} words.`,
        },
      ],
      temperature: 0.5,
    });

    let summary = completion.choices[0].message.content.trim();

    
    const words = summary.split(/\s+/);
    if (words.length > targetWords) {
      summary = words.slice(0, targetWords).join(" ") + ".";
    }

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI service error" });
  }
});

export default router;
