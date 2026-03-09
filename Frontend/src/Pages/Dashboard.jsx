import { useAuth, api } from "../context/AuthContext";
import { useState } from "react";
import { LogOut, Activity, User } from "lucide-react";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        try {
            const { data } = await api.post("/analyze");
            setAnalysisResult(data);
            setError("");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to analyze");
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white">
            <nav className="bg-[#111113] border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2 font-bold text-xl text-indigo-400">
                            <Activity className="text-indigo-500" />
                            <span>Docgen AI Dashboard</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                                <span>{user?.name || "User"}</span>
                                <span className="text-xs text-gray-500 mx-1">•</span>
                                <span className="text-xs text-gray-400">{user?.provider}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                                title="Log out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#111113] rounded-xl border border-gray-800 p-6 shadow-xl col-span-1 md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-white">Repository Analysis (Protected)</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            This endpoint (`POST /api/analyze`) is protected by JWT authentication.
                            If you are seeing this, your HTTP-only cookie is successfully authorizing requests!
                        </p>

                        <button
                            onClick={handleAnalyze}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#111113]"
                        >
                            <Activity className="w-5 h-5" />
                            Test Protected Route
                        </button>

                        {error && (
                            <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {analysisResult && (
                            <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
                                <pre className="text-xs text-gray-300 font-mono">
                                    {JSON.stringify(analysisResult, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>

                    <div className="bg-[#111113] rounded-xl border border-gray-800 p-6 shadow-xl">
                        <h3 className="text-lg font-medium text-white mb-4">Session Info</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
                                <div className="mt-1 flex items-center text-sm text-emerald-400 gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Active Session
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-gray-500 uppercase">Provider</span>
                                <div className="mt-1 text-sm text-gray-300 capitalize">{user?.provider}</div>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-gray-500 uppercase">Identifer</span>
                                <div className="mt-1 text-sm text-gray-300 truncate">{user?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
