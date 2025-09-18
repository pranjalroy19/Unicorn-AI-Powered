// routes/summarize.js
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    // Import and initialize OpenAI here
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // choose your model
      messages: [{ role: "user", content: `Summarize this text:\n${text}` }],
    });

    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI service error" });
  }
});

export default router;
