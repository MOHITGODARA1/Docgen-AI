import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            res.status(401).json({ error: "Not authorized, invalid token" });
        }
    } else {
        res.status(401).json({ error: "Not authorized, no token" });
    }
};
