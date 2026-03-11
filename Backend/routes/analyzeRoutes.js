import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    analyzeRepository,
    getAnalysisHistory,
    getAnalysisById,
    deleteAnalysis
} from "../controllers/analysisController.js";

const router = express.Router();

router.post("/", protect, analyzeRepository);
router.get("/history", protect, getAnalysisHistory);
router.get("/:id", protect, getAnalysisById);
router.delete("/:id", protect, deleteAnalysis);

export default router;
