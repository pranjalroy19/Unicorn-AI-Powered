import express from "express";
import { exportContent } from "../controllers/exportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id/:format", protect, exportContent);

export default router;
