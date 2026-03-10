import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import Overview from "../components/dashboard/Overview";
import AnalysisReport from "../components/dashboard/AnalysisReport";

export default function Dashboard() {
    const [activeView, setActiveView] = useState("overview"); // 'overview' | 'report'
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState("");

    // Simulated Analysis Flow
    const handleAnalyze = async (url) => {
        setIsAnalyzing(true);
        setError("");

        try {
            // Fake network latency (2 seconds)
            await new Promise(resolve => setTimeout(resolve, 2000));
            // In a real scenario we'd call the API here:
            // const { data } = await api.post("/analyze", { url });

            // On success, flip the view to the report
            setActiveView("report");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to analyze repository. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white flex">
            {/* Sidebar Navigation */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Navbar */}
                <DashboardNavbar />

                {/* Main Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {activeView === "overview" && (
                        <Overview
                            onAnalyze={handleAnalyze}
                            isAnalyzing={isAnalyzing}
                            error={error}
                        />
                    )}

                    {activeView === "report" && (
                        <AnalysisReport onBack={() => setActiveView("overview")} />
                    )}
                </main>
            </div>
        </div>
    );
}
