// utils/openaiClient.js
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

/**
 * Simple OpenAI client wrapper.
 * Exports:
 *  - client (default): raw OpenAI client
 *  - createChatCompletion: helper that returns assistant text
 *
 * NOTE: Make sure OPENAI_API_KEY is set in .env
 */

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createChatCompletion = async (messages = [], options = {}) => {
  try {
    const model = options.model || "gpt-4o-mini";
    const max_tokens = options.max_tokens || 1200;

    const resp = await client.chat.completions.create({
      model,
      messages,
      max_tokens,
    });

    // Extract assistant reply text
    const text =
      resp?.choices?.[0]?.message?.content ??
      resp?.choices?.[0]?.text ??
      "";

    return text;
  } catch (err) {
    console.error("OpenAI error:", err.message);
    throw err;
  }
};

export default client;
