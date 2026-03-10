import { LogOut, User, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardNavbar() {
    const { user, logout } = useAuth();

    return (
        <header className="h-16 bg-[#111113]/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40 flex items-center justify-between px-8">
            <div className="flex items-center">
                {/* Optional Breadcrumbs or Page Title could go here based on URL */}
                <h1 className="text-white font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Overview
                </h1>
            </div>

            <div className="flex items-center gap-5">
                {/* Notification Bell */}
                <button className="relative text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border border-[#111113]"></span>
                </button>

                <div className="w-px h-6 bg-gray-800"></div>

                {/* Profile Section */}
                <div className="flex items-center gap-3 bg-gray-900/50 pl-1 pr-3 py-1 rounded-full border border-gray-800">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-7 h-7 rounded-full object-cover border border-gray-700"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
                    <div className="flex flex-col hidden sm:flex">
                        <span className="text-white text-sm font-medium leading-none">{user?.name}</span>
                        <span className="text-gray-500 text-[10px] capitalize font-medium">{user?.provider} User</span>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors ml-2 p-1.5 rounded-lg hover:bg-gray-800"
                    title="Sign Out"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}
