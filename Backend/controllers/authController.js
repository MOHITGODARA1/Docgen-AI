import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import axios from "axios";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all fields" });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: "Server error during registration" });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please provide both email and password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !user.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error during login" });
    }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout // Note: User requested GET
// @access  Public
export const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Check auth status / Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
    });
};

// @desc    GitHub OAuth Callback processing
// @route   POST /api/auth/github
// @access  Public
export const githubAuth = async (req, res) => {
    const { code } = req.body; 

    if (!code) {
        return res.status(400).json({ error: "Authorization code missing" });
    }

    try {
        // Exchange code for access token
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

        // Get User emails from Github 
        const emailsResponse = await axios.get("https://api.github.com/user/emails", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        const githubUser = userResponse.data;
        const primaryEmailObj = emailsResponse.data.find(e => e.primary);
        const email = primaryEmailObj ? primaryEmailObj.email : githubUser.email;
        const name = githubUser.name || githubUser.login;
        const githubId = githubUser.id.toString();

        if (!email) {
            return res.status(400).json({ error: "No email associated with this GitHub account" });
        }

        let user = await User.findOne({ githubId });

        if (!user) {
            // Check if user exists with the same email
            user = await User.findOne({ email });

            if (user) {
                // Link account
                user.githubId = githubId;
                if (!user.avatar) user.avatar = githubUser.avatar_url;
                await user.save();
            } else {
                user = await User.create({
                    name,
                    email,
                    githubId,
                    avatar: githubUser.avatar_url
                });
            }
        }

        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });

    } catch (error) {
        console.error("GitHub Auth Error:", error.message);
        res.status(500).json({ error: "GitHub authentication failed" });
    }
};

// @desc    Redirect to GitHub OAuth
// @route   GET /api/auth/github
// @access  Public
export const githubRedirect = (req, res) => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
    res.redirect(githubAuthUrl);
};
