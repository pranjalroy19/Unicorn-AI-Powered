import express from "express";
import { getUserContents, deleteContent } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getUserContents);
router.delete("/:id", protect, deleteContent);

export default router;
