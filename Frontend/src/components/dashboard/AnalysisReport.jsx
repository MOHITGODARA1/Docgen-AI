import { useState } from "react";
import { ArrowLeft, GitFork, Star, Eye, FileText, Code2, Database, Box, Server, CheckCircle, TerminalSquare, Lightbulb } from "lucide-react";

export default function AnalysisReport({ onBack }) {
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
                        moby/moby
                    </h2>
                    <p className="text-gray-400 text-sm mt-1 flex items-center gap-4">
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> 68.2k</span>
                        <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> 18.5k</span>
                        <span>• Analyzed just now</span>
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
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    Moby is an open-source project created by Docker to enable and accelerate software containerization.
                                    It provides a "Lego set" of toolkit components, the framework for assembling them into custom container-based systems, and a place for all container enthusiasts to experiment and exchange ideas.
                                </p>

                                <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-widest mb-3">Detected Tech Stack</h4>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <Badge>Go</Badge>
                                    <Badge>Shell</Badge>
                                    <Badge>Makefile</Badge>
                                    <Badge>Docker</Badge>
                                    <Badge>Linux</Badge>
                                </div>

                                <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-widest mb-3">Main Features</h4>
                                <ul className="space-y-3">
                                    <CheckItem text="OOTB Container Runtime Engine" />
                                    <CheckItem text="Pluggable architecture for networks and volumes" />
                                    <CheckItem text="Built-in Swarm orchestration" />
                                    <CheckItem text="Extensive CLI for daemon management" />
                                </ul>
                            </ContentCard>
                        </div>
                    )}

                    {/* SECTION 2: STRUCTURE */}
                    {activeTab === "structure" && (
                        <ContentCard title="Repository Structure">
                            <p className="text-gray-400 text-sm mb-4">A visual representation of the core module hierarchy.</p>
                            <div className="bg-[#0A0A0B] border border-gray-800 p-4 rounded-lg font-mono text-sm text-gray-300 overflow-x-auto">
                                <FileTreeItem name="moby" isFolder level={0} />
                                <FileTreeItem name="api" isFolder level={1} />
                                <FileTreeItem name="types" isFolder level={2} />
                                <FileTreeItem name="builder" isFolder level={1} />
                                <FileTreeItem name="dockerfile" isFolder level={2} />
                                <FileTreeItem name="cli" isFolder level={1} />
                                <FileTreeItem name="cmd" isFolder level={1} />
                                <FileTreeItem name="dockerd" isFolder level={2} />
                                <FileTreeItem name="daemon" isFolder level={1} />
                                <FileTreeItem name="registry" isFolder level={1} />
                                <FileTreeItem name="volume" isFolder level={1} />
                                <FileTreeItem name="Makefile" isFolder={false} level={1} />
                                <FileTreeItem name="Dockerfile" isFolder={false} level={1} />
                                <FileTreeItem name="go.mod" isFolder={false} level={1} />
                            </div>
                        </ContentCard>
                    )}

                    {/* SECTION 3: ARCHITECTURE */}
                    {activeTab === "architecture" && (
                        <ContentCard title="Simulated Architecture Flow">
                            <p className="text-gray-400 text-sm mb-6">High-level interaction between core components.</p>

                            <div className="bg-[#0A0A0B] border border-gray-800 rounded-xl p-8 flex flex-col items-center gap-6">
                                {/* Flowchart Mockup */}
                                <div className="flex items-center gap-4 w-full justify-center">
                                    <ArchBox icon={TerminalSquare} label="Docker CLI" type="Frontend" />
                                    <Arrow />
                                    <ArchBox icon={Server} label="Docker Daemon" type="Backend Runtime" />
                                </div>
                                <Arrow vertical />
                                <div className="flex gap-12 w-full justify-center">
                                    <ArchBox icon={Database} label="Registry API" type="External" />
                                    <ArchBox icon={Box} label="containerd" type="Core Execution" />
                                </div>
                            </div>
                        </ContentCard>
                    )}

                    {/* SECTION 4: DOCUMENTATION */}
                    {activeTab === "documentation" && (
                        <ContentCard title="Generated Documentation Preview">
                            <div className="prose prose-invert prose-indigo max-w-none prose-sm sm:prose-base">
                                <h3>Daemon Configuration (`/daemon`)</h3>
                                <p>
                                    The Docker daemon (`dockerd`) is the core background service that manages Docker objects such as images, containers, networks, and volumes. The `/daemon` folder contains the bulk of the logic handling API requests from the CLI.
                                </p>

                                <h3>Builder (`/builder`)</h3>
                                <p>
                                    This module is responsible for taking a `Dockerfile` and a build context, and executing the steps required to spit out a container image. It interfaces heavily with early phases of the container runtime.
                                </p>

                                <h3>Important Files</h3>
                                <ul>
                                    <li><code>cmd/dockerd/daemon.go</code> - The main entrypoint for the background daemon.</li>
                                    <li><code>api/server/server.go</code> - Initializes the HTTP router for the Docker Remote API.</li>
                                </ul>
                            </div>
                        </ContentCard>
                    )}

                    {/* SECTION 5, 6, 7: SETUP */}
                    {activeTab === "setup" && (
                        <div className="space-y-6">
                            <ContentCard title="Requirements">
                                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                                    <li>Linux kernel \&gt;= 3.10</li>
                                    <li>Go \&gt;= 1.20</li>
                                    <li>Make</li>
                                    <li>Git</li>
                                </ul>
                            </ContentCard>

                            <ContentCard title="How to Clone & Setup">
                                <p className="text-gray-400 text-sm mb-3">Run these commands in your terminal to bootstrap the project.</p>
                                <div className="bg-[#0A0A0B] border border-gray-800 p-4 rounded-lg font-mono text-sm text-green-400 overflow-x-auto mb-6">
                                    $ git clone https://github.com/moby/moby.git<br />
                                    $ cd moby<br />
                                    $ make BIND_DIR=. shell
                                </div>

                                <h4 className="text-white font-semibold mb-3">How to Start / Compile</h4>
                                <div className="bg-[#0A0A0B] border border-gray-800 p-4 rounded-lg font-mono text-sm text-green-400 overflow-x-auto">
                                    $ make binary<br />
                                    $ sudo ./bundles/binary-daemon/dockerd
                                </div>
                            </ContentCard>
                        </div>
                    )}

                    {/* SECTION 8: IMPROVEMENTS */}
                    {activeTab === "improvements" && (
                        <ContentCard title="AI Suggested Improvements">
                            <p className="text-gray-400 text-sm mb-6">Based on static code analysis, the AI recommends the following modernizations:</p>

                            <div className="space-y-4">
                                <SuggestionCard
                                    title="Deprecate Legacy API versions"
                                    desc="The `/api` folder still contains routing for Docker API v1.24. Retiring these endpoints will reduce maintenance overhead."
                                />
                                <SuggestionCard
                                    title="Migrate CI to GitHub Actions completely"
                                    desc="There are legacy Jenkinsfiles scattered. Consolidating the pipeline into `./.github/workflows` will improve developer visibility."
                                />
                                <SuggestionCard
                                    title="Increase test coverage in Volume drivers"
                                    desc="The `volume/local` module has an estimated test coverage of 62%. Adding edge-case unit tests here is highly recommended."
                                />
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

const Badge = ({ children }) => (
    <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs font-medium text-gray-300">
        {children}
    </span>
);

const CheckItem = ({ text }) => (
    <li className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <span className="text-gray-300">{text}</span>
    </li>
);

const FileTreeItem = ({ name, isFolder, level }) => {
    return (
        <div className="flex items-center gap-2 py-1" style={{ paddingLeft: `${level * 24}px` }}>
            {isFolder ? (
                <span className="text-indigo-400">📁</span>
            ) : (
                <span className="text-gray-500">📄</span>
            )}
            <span className={isFolder ? "text-indigo-200" : "text-gray-400"}>{name}</span>
        </div>
    );
};

const ArchBox = ({ icon: Icon, label, type }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 border border-gray-700 rounded-xl w-40 text-center shadow-lg">
        <Icon className="w-8 h-8 text-indigo-400 mb-2" />
        <span className="font-semibold text-gray-200 text-sm">{label}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{type}</span>
    </div>
);

const Arrow = ({ vertical }) => (
    <div className={`flex items-center justify-center ${vertical ? "my-2" : ""}`}>
        {vertical ? (
            <div className="w-px h-8 bg-gray-600"></div>
        ) : (
            <div className="w-8 h-px bg-gray-600"></div>
        )}
    </div>
);

const SuggestionCard = ({ title, desc }) => (
    <div className="p-4 border border-indigo-500/20 bg-indigo-500/5 rounded-xl">
        <h4 className="text-indigo-400 font-semibold mb-1 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> {title}
        </h4>
        <p className="text-sm text-gray-400">{desc}</p>
    </div>
);
