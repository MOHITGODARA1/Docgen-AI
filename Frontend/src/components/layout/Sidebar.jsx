import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileCode2, History, BookOpen, Settings } from "lucide-react";

export default function Sidebar() {
    const location = useLocation();

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Analyze Repo", href: "#", icon: FileCode2 },
        { name: "Analysis History", href: "#", icon: History },
        { name: "Documentation", href: "#", icon: BookOpen },
        { name: "Settings", href: "#", icon: Settings },
    ];

    const isActive = (href) => {
        if (href === "#") return false;
        return location.pathname === href;
    };

    return (
        <aside className="w-64 bg-[#111113] border-r border-gray-800 flex flex-col h-screen sticky top-0">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-800 shrink-0">
                <Link to="/" className="flex items-center gap-2.5 no-underline">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20">
                        D
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight flex items-baseline gap-1">
                        DocGen <span className="text-gray-500 font-medium text-sm">AI</span>
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                    Main Menu
                </div>
                {navigation.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${active
                                    ? "bg-indigo-500/10 text-indigo-400"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${active ? "text-indigo-400" : "text-gray-500"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Upgrade Prompt */}
            <div className="p-4 shrink-0">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800 rounded-xl p-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                    <h4 className="text-white text-sm font-semibold mb-1 relative z-10">Pro Plan</h4>
                    <p className="text-gray-400 text-xs mb-3 relative z-10">Access unlimited repo analysis & exports.</p>
                    <button className="w-full bg-white text-gray-900 text-xs font-semibold py-2 rounded-md hover:bg-gray-100 transition-colors relative z-10">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </aside>
    );
}
