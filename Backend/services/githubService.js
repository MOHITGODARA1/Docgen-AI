import axios from "axios";

/**
 * Extracts owner and repo from a GitHub URL.
 * @param {string} url - GitHub repository URL
 * @returns {object} { owner, repo }
 */
const parseGitHubUrl = (url) => {
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname !== "github.com") {
            throw new Error("Invalid GitHub URL");
        }
        const parts = parsedUrl.pathname.split("/").filter(Boolean);
        if (parts.length < 2) {
            throw new Error("Invalid GitHub repository URL format");
        }
        return { owner: parts[0], repo: parts[1].replace('.git', '') };
    } catch (error) {
        throw new Error("Failed to parse GitHub URL: " + error.message);
    }
};

/**
 * Fetches repository metadata, tree, and key files.
 * @param {string} url - GitHub repository URL
 * @returns {Promise<object>} Repository data required for analysis
 */
export const fetchRepositoryData = async (url) => {
    const { owner, repo } = parseGitHubUrl(url);

    const headers = {
        Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    try {
        // 1. Fetch Basic Repo Info (default branch, description, language)
        const repoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers });
        const defaultBranch = repoResponse.data.default_branch;
        const description = repoResponse.data.description;
        const language = repoResponse.data.language;

        // 2. Fetch File Tree
        const treeResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
            { headers }
        );
        
        let tree = treeResponse.data.tree;
        
        // Structure the tree into a simpler format and filter out unnecessary huge files/folders
        const excludeDirs = ['node_modules', 'dist', 'build', '.git', 'coverage'];
        let simplifiedTree = tree
            .filter(item => {
                const parts = item.path.split('/');
                return !parts.some(part => excludeDirs.includes(part));
            })
            .map(item => ({
                path: item.path,
                type: item.type, // 'blob' or 'tree'
            }));

        // Limit the tree size if it's too large to prevent blowing up the LLM context
        if (simplifiedTree.length > 1000) {
            simplifiedTree = simplifiedTree.slice(0, 1000);
            simplifiedTree.push({ path: '... (tree truncated due to size)', type: 'blob' });
        }

        // 3. Fetch specific important files content (e.g., package.json, README)
        const filesToFetch = ["README.md", "readme.md", "package.json", "requirements.txt", "Pipfile", "pom.xml", "docker-compose.yml", "Dockerfile"];
        const fileContents = {};

        for (const file of filesToFetch) {
            // Find in the root of the tree
            const fileNode = tree.find(item => item.path === file || item.path.toLowerCase() === file.toLowerCase());
            
            if (fileNode && fileNode.type === 'blob') {
                try {
                    const contentResponse = await axios.get(
                        `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${fileNode.path}`,
                        { 
                            headers: process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}
                        }
                    );
                    
                    // Convert content to string (handle JSON properly)
                    let textContent = contentResponse.data;
                    if (typeof textContent === 'object') {
                        textContent = JSON.stringify(textContent, null, 2);
                    }
                    fileContents[fileNode.path] = textContent.substring(0, 10000); // truncate if too huge
                } catch (err) {
                    console.warn(`Could not fetch ${fileNode.path}: ${err.message}`);
                }
            }
        }

        // 4. Fetch languages used
        const languagesResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/languages`,
            { headers }
        );

        return {
            name: repoResponse.data.name,
            fullName: repoResponse.data.full_name,
            description,
            primaryLanguage: language,
            languages: Object.keys(languagesResponse.data),
            tree: simplifiedTree,
            fileContents,
        };

    } catch (error) {
        console.error("fetchRepositoryData Error:", error.message);
        if (error.response && error.response.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
             throw new Error("GitHub API rate limit exceeded. Please configure GITHUB_TOKEN in backend .env.");
        }
        if (error.response && error.response.status === 404) {
             throw new Error("Repository not found or is private.");
        }
        throw new Error("Failed to fetch repository data from GitHub.");
    }
};
