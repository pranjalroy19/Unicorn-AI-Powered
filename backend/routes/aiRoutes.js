import express from "express";
import {
  summarizeText,
  generateBlog,
  chatAssistant,
} from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();


router.post("/summarize", protect, summarizeText);
router.post("/blog", protect, generateBlog);
router.post("/chat", protect, chatAssistant);

export default router;
