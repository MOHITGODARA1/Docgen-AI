import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeRepositoryWithGemini = async (repoData) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured in the environment variables.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Using a fast/capable model

    // Construct the prompt
    let prompt = `You are an expert Software Architect and Developer.
Analyze the following GitHub repository and provide a comprehensive report formatted STRICTLY as a JSON object matching the requested schema.

REPOSITORY DETAILS:
Name: ${repoData.fullName}
Description: ${repoData.description || "N/A"}
Primary Language: ${repoData.primaryLanguage || "N/A"}
All Languages Used: ${repoData.languages.join(", ")}

KEY FILES CONTENT:
`;

    for (const [filename, content] of Object.entries(repoData.fileContents)) {
        prompt += `\n--- START ${filename} ---\n${content}\n--- END ${filename} ---\n`;
    }

    prompt += `
\nREPOSITORY STRUCTURE (Directories & Files):
`;
    // Format the tree
    const treePaths = repoData.tree.map(item => item.path).join("\n");
    prompt += `${treePaths}\n`;

    prompt += `
\nTASK:
Generate a structured JSON response with exactly the following keys. The values should be detailed markdown strings answering the prompts. DO NOT wrap the output in markdown code blocks (\`\`\`json). Just return the raw JSON string.

Schema:
{
  "overview": "A markdown string explaining what the project does, its main purpose, and the technologies used.",
  "structure": "A markdown string explaining the folder hierarchy and important files.",
  "architecture": "A markdown string explaining the design pattern, data flow, and backend/frontend structure.",
  "docs": "A markdown string providing auto-generated documentation and explanation of key modules.",
  "setup": "A markdown string giving step-by-step instructions to clone, install dependencies, and run the project.",
  "suggestions": "A markdown string providing AI suggestions for code improvements, performance, security, and scalability."
}

Ensure the markdown inside the JSON strings is properly escaped (e.g., escape quotes, use \\n for newlines).
`;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();

        // Clean up text if it contains markdown code block wrappers
        text = text.trim();
        if (text.startsWith("```json")) {
            text = text.substring(7);
        } else if (text.startsWith("```")) {
            text = text.substring(3);
        }
        if (text.endsWith("```")) {
            text = text.substring(0, text.length - 3);
        }
        text = text.trim();

        const parsedResult = JSON.parse(text);

        // Validate structure
        const requiredKeys = ["overview", "structure", "architecture", "docs", "setup", "suggestions"];
        for (const key of requiredKeys) {
            if (typeof parsedResult[key] !== 'string') {
                parsedResult[key] = "Not provided by AI.";
            }
        }

        return parsedResult;

    } catch (error) {
        console.error("Gemini AI Analysis Error:", error);
        throw new Error("Failed to analyze repository using Gemini AI.");
    }
};
