import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { text, length } = req.body;

    const lengthMap = {
      short: "around 2-3 sentences",
      medium: "around 1 paragraph",
      detailed: "around 2-3 paragraphs",
    };

    const prompt = `Summarize the following text in ${lengthMap[length] || "a short"} summary:\n\n${text}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ summary: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize" });
  }
});

export default router;
