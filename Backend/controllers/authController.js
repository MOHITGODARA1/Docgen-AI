import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import axios from "axios";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!password || password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            if (userExists.provider !== "email") {
                return res.status(400).json({ error: `You previously signed up with ${userExists.provider}. Please log in with that provider.` });
            }
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            provider: "email",
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                provider: user.provider,
                avatar: user.avatar,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        if (user.provider !== "email") {
            return res.status(401).json({ error: `Please log in using ${user.provider}` });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            user.lastLogin = Date.now();
            await user.save();
            generateToken(res, user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                provider: user.provider,
                avatar: user.avatar,
            });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Removed Google OAuth

// @desc    GitHub OAuth
// @route   POST /api/auth/github
// @access  Public
export const githubAuth = async (req, res) => {
    const { code } = req.body; // Code from Github redirect

    try {
        const tokenResponse = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        }, {
            headers: {
                Accept: "application/json"
            }
        });

        const accessToken = tokenResponse.data.access_token;

        if (!accessToken) {
            return res.status(400).json({ error: "GitHub token acquisition failed" });
        }

        // Get User details from Github
        const userResponse = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        // Get User emails from Github since main email might be private
        const emailsResponse = await axios.get("https://api.github.com/user/emails", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        const githubUser = userResponse.data;
        const primaryEmailObj = emailsResponse.data.find(e => e.primary);
        const email = primaryEmailObj ? primaryEmailObj.email : githubUser.email;
        const name = githubUser.name || githubUser.login;

        if (!email) {
            return res.status(400).json({ error: "No email associated with this GitHub account" });
        }

        let user = await User.findOne({ email });

        if (user) {
            if (user.provider !== 'github') {
                return res.status(400).json({ error: `Please log in using ${user.provider}` });
            }
            user.lastLogin = Date.now();
            await user.save();
        } else {
            user = await User.create({
                name,
                email,
                avatar: githubUser.avatar_url,
                provider: "github"
            });
        }

        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            provider: user.provider,
            avatar: user.avatar,
        });

    } catch (error) {
        console.error("GitHub Auth Error:", error.message);
        res.status(500).json({ error: "GitHub authentication failed" });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Check auth status
// @route   GET /api/auth/check
// @access  Private
export const checkAuth = async (req, res) => {
    // Access through protect middleware, so user is already verified
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        provider: req.user.provider,
        avatar: req.user.avatar,
    });
};
