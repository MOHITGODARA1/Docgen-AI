import express from "express";
import {
    registerUser,
    authUser,
    googleAuth,
    githubAuth,
    logoutUser,
    checkAuth,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/google", googleAuth);
router.post("/github", githubAuth);
router.post("/logout", logoutUser);
router.get("/check", protect, checkAuth);

export default router;
