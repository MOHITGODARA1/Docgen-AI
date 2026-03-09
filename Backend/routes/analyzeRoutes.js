import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, (req, res) => {
    res.status(200).json({
        message: "Analysis successful",
        repoData: "Mock repository details analyzed successfully for " + req.user.name,
    });
});

export default router;
