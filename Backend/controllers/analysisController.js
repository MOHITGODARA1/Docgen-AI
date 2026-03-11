import Analysis from "../models/Analysis.js";
import { fetchRepositoryData } from "../services/githubService.js";
import { analyzeRepositoryWithGemini } from "../services/geminiService.js";

// @desc    Analyze a GitHub repository and save the report
// @route   POST /api/analyze
// @access  Private
export const analyzeRepository = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "Repository URL is required" });
    }

    try {
        // 1. Fetch data from GitHub
        const repoData = await fetchRepositoryData(url);

        // 2. Pass data to Gemini AI
        const analysisResult = await analyzeRepositoryWithGemini(repoData);

        // 3. Save to Database
        const analysis = await Analysis.create({
            userId: req.user._id,
            repositoryUrl: url,
            repoName: repoData.fullName,
            analysisSections: analysisResult,
        });

        // 4. Return the result
        res.status(201).json(analysis);

    } catch (error) {
        console.error("Analyze Repository Error:", error.message);
        res.status(500).json({ error: error.message || "Failed to analyze repository" });
    }
};

// @desc    Get all analysis history for the current user
// @route   GET /api/analyze/history
// @access  Private
export const getAnalysisHistory = async (req, res) => {
    try {
        const history = await Analysis.find({ userId: req.user._id })
            .select("repositoryUrl repoName createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json(history);
    } catch (error) {
        console.error("Get History Error:", error.message);
        res.status(500).json({ error: "Failed to fetch analysis history" });
    }
};

// @desc    Get a specific analysis report by ID
// @route   GET /api/analyze/:id
// @access  Private
export const getAnalysisById = async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id);

        if (!analysis) {
            return res.status(404).json({ error: "Analysis not found" });
        }

        // Check if the analysis belongs to the requesting user
        if (analysis.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Not authorized to view this analysis" });
        }

        res.status(200).json(analysis);
    } catch (error) {
        console.error("Get Analysis By ID Error:", error.message);
        res.status(500).json({ error: "Failed to fetch analysis report" });
    }
};

// @desc    Delete a specific analysis report by ID
// @route   DELETE /api/analyze/:id
// @access  Private
export const deleteAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id);

        if (!analysis) {
            return res.status(404).json({ error: "Analysis not found" });
        }

        if (analysis.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Not authorized to delete this analysis" });
        }

        await analysis.deleteOne();

        res.status(200).json({ message: "Analysis deleted successfully" });
    } catch (error) {
        console.error("Delete Analysis Error:", error.message);
        res.status(500).json({ error: "Failed to delete analysis report" });
    }
};
