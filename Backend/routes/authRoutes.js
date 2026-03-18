import express from "express";
import {
    registerUser,
    authUser,
    githubAuth,
    githubRedirect,
    logoutUser,
    getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/logout", logoutUser);
router.get("/me", protect, getMe);

// GitHub OAuth
router.get("/github", githubRedirect);
router.post("/github", githubAuth); // Frontend uses this to send the code

export default router;
