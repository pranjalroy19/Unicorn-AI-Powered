import express from "express";
const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", //here we can also use gpt-3-turbo
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "AI service error" });
  }
});

export default router;