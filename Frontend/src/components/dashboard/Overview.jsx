import { useState } from "react";
import { Activity, Clock, FileText, CheckCircle, ChevronRight, Github, ExternalLink } from "lucide-react";

export default function Overview({ onAnalyze, isAnalyzing, error }) {
    const [repoUrl, setRepoUrl] = useState("");

    const handleAnalyze = (e) => {
        e.preventDefault();
        if (repoUrl.trim()) {
            onAnalyze(repoUrl);
        }
    };

    // Dummy data for history
    const historyData = [
        { id: 1, name: "facebook/react", owner: "facebook", date: "2 hours ago", status: "Success" },
        { id: 2, name: "vercel/next.js", owner: "vercel", date: "Yesterday", status: "Success" },
        { id: 3, name: "tailwindlabs/tailwindcss", owner: "tailwindlabs", date: "3 days ago", status: "Success" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Analysis Card */}
            <div className="bg-[#111113] border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                {/* Background decorative elements */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-1000"></div>
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-1000"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back! 👋</h2>
                    <p className="text-gray-400 mb-8 max-w-xl text-sm leading-relaxed">
                        Analyze any public GitHub repository and instantly generate architecture diagrams, documentation, setup instructions, and component breakdowns.
                    </p>

                    <form onSubmit={handleAnalyze} className="relative max-w-3xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Github className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="url"
                            placeholder="https://github.com/moby/moby"
                            value={repoUrl}
                            onChange={(e) => setRepoUrl(e.target.value)}
                            required
                            className="w-full pl-12 pr-40 py-4 bg-[#0A0A0B] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={isAnalyzing || !repoUrl.trim()}
                            className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold flex items-center gap-2 px-6 rounded-lg transition-all"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    Analyze <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Repos Analyzed", value: "1,248", icon: Activity, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                    { label: "Docs Generated", value: "8,392", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "Last Analysis Time", value: "24.5s", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#111113] border border-gray-800 rounded-xl p-6 flex items-center gap-5 hover:border-gray-700 transition-colors">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-white text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analysis History */}
            <div className="bg-[#111113] border border-gray-800 rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Recent Analyses</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A0A0B] text-gray-400 border-b border-gray-800">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Repository Name</th>
                                <th className="px-6 py-4 font-semibold">Owner</th>
                                <th className="px-6 py-4 font-semibold">Analyzed</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {historyData.map((repo) => (
                                <tr key={repo.id} className="hover:bg-gray-800/20 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium flex items-center gap-2">
                                        <Github className="w-4 h-4 text-gray-500" />
                                        {repo.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{repo.owner}</td>
                                    <td className="px-6 py-4 text-gray-400">{repo.date}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            {repo.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium text-xs transition-colors">
                                            View Report <ExternalLink className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
