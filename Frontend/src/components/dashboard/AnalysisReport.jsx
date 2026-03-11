import { useState } from "react";
import { ArrowLeft, GitFork, Star, Eye, FileText, Code2, Database, Box, Server, CheckCircle, TerminalSquare, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AnalysisReport({ onBack, data }) {
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: "Overview", icon: Eye },
        { id: "structure", label: "Structure", icon: GitFork },
        { id: "architecture", label: "Architecture", icon: Database },
        { id: "documentation", label: "Docs", icon: FileText },
        { id: "setup", label: "Setup", icon: TerminalSquare },
        { id: "improvements", label: "AI Suggestions", icon: Lightbulb },
    ];

    return (
        <div className="max-w-6xl mx-auto animate-in slide-in-from-right-8 duration-500">
            {/* Header / Back Navigation */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 bg-[#111113] border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <GithubIcon />
                        {data?.repoName || "Unknown Repository"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1 flex items-center gap-4">
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> -</span>
                        <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> -</span>
                        <span>• Analyzed {data?.createdAt ? new Date(data.createdAt).toLocaleString() : "just now"}</span>
                    </p>
                </div>
            </div>

            {/* Main Layout: Sidebar Tabs + Content Area */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Embedded Tab Navigation (Left Side) */}
                <div className="md:w-64 shrink-0">
                    <div className="bg-[#111113] border border-gray-800 rounded-xl p-3 sticky top-24 space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                        ? "bg-indigo-500/10 text-indigo-400"
                                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                                    }`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-indigo-400" : "text-gray-500"}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 min-w-0">
                    {/* SECTION 1: OVERVIEW */}
                    {activeTab === "overview" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <ContentCard title="Project Overview">
                                <div className="prose prose-invert prose-indigo max-w-none prose-sm sm:prose-base">
                                    <ReactMarkdown>{data?.analysisSections?.overview || "No overview available."}</ReactMarkdown>
                                </div>
                            </ContentCard>
                        </div>
                    )}

                    {/* SECTION 2: STRUCTURE */}
                    {activeTab === "structure" && (
                        <ContentCard title="Repository Structure">
                            <div className="prose prose-invert prose-indigo max-w-none prose-sm sm:prose-base">
                                <ReactMarkdown>{data?.analysisSections?.structure || "No structure data available."}</ReactMarkdown>
                            </div>
                        </ContentCard>
                    )}

                    {/* SECTION 3: ARCHITECTURE */}
                    {activeTab === "architecture" && (
                        <ContentCard title="Architecture Flow">
                            <div className="prose prose-invert prose-indigo max-w-none prose-sm sm:prose-base">
                                <ReactMarkdown>{data?.analysisSections?.architecture || "No architecture data available."}</ReactMarkdown>
                            </div>
                        </ContentCard>
                    )}

                    {/* SECTION 4: DOCUMENTATION */}
                    {activeTab === "documentation" && (
                        <ContentCard title="Generated Documentation Preview">
                            <div className="prose prose-invert prose-indigo max-w-none prose-sm sm:prose-base">
                                <ReactMarkdown>{data?.analysisSections?.docs || "No documentation available."}</ReactMarkdown>
                            </div>
                        </ContentCard>
                    )}

                    {/* SECTION 5: SETUP */}
                    {activeTab === "setup" && (
                        <ContentCard title="How to Clone & Setup">
                            <div className="prose prose-invert prose-indigo max-w-none prose-sm sm:prose-base">
                                <ReactMarkdown>{data?.analysisSections?.setup || "No setup instructions available."}</ReactMarkdown>
                            </div>
                        </ContentCard>
                    )}

                    {/* SECTION 6: IMPROVEMENTS */}
                    {activeTab === "improvements" && (
                        <ContentCard title="AI Suggested Improvements">
                            <div className="prose prose-invert prose-indigo max-w-none prose-sm sm:prose-base">
                                <ReactMarkdown>{data?.analysisSections?.suggestions || "No AI suggestions available."}</ReactMarkdown>
                            </div>
                        </ContentCard>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper UI Components
const GithubIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
    </svg>
);

const ContentCard = ({ title, children }) => (
    <div className="bg-[#111113] border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        {children}
    </div>
);
