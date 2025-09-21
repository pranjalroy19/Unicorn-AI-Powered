import Content from "../models/Content.js";
import { createChatCompletion } from "../utils/openaiClient.js";

export const summarizeText = async (req, res) => {
  try {
    const { text, length } = req.body;
    const prompt = `Summarize the following text in a ${length || "short"} way:\n\n${text}`;

    const summary = await createChatCompletion(
      [{ role: "user", content: prompt }],
      { model: "gpt-4o-mini", max_tokens: 500 }
    );

    const content = await Content.create({
      user: req.user._id,
      type: "summary",
      input: text,
      output: summary,
    });

    res.json(content);
  } catch (err) {
    console.error("Summarize error:", err);
    res.status(500).json({ message: "Error summarizing" });
  }
};

export const generateBlog = async (req, res) => {
  try {
    const { topic } = req.body;
    const prompt = `Write a detailed blog post about: ${topic}`;

    const blog = await createChatCompletion(
      [{ role: "user", content: prompt }],
      { model: "gpt-4o-mini", max_tokens: 1200 }
    );

    const content = await Content.create({
      user: req.user._id,
      type: "blog",
      input: topic,
      output: blog,
    });

    res.json(content);
  } catch (err) {
    console.error("Blog error:", err);
    res.status(500).json({ message: "Error generating blog" });
  }
};

export const chatAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await createChatCompletion(
      [{ role: "user", content: message }],
      { model: "gpt-4o-mini", max_tokens: 800 }
    );

    const content = await Content.create({
      user: req.user._id,
      type: "chat",
      input: message,
      output: reply,
    });

    res.json(content);
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ message: "Error in chat assistant" });
  }
};