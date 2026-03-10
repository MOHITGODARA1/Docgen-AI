import { useState, useEffect } from "react";
import { useAuth, api } from "../context/AuthContext";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Github, Mail, Code2 } from "lucide-react";

export default function Login() {
    const { login, register, user, setOAuthUser } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Handle GitHub Redirect Capture
    useEffect(() => {
        const githubCode = searchParams.get("code");

        if (githubCode) {
            const completeGithubLogin = async () => {
                try {
                    const { data } = await api.post("/auth/github", { code: githubCode });
                    setOAuthUser(data);
                    navigate("/dashboard");
                } catch (err) {
                    console.error("Github login failed:", err);
                    setError("GitHub login failed.");
                }
            };
            completeGithubLogin();
        }
    }, [searchParams, navigate, setOAuthUser]);

    if (user) return <Navigate to="/dashboard" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Manual validation for registration
        if (!isLogin) {
            if (password.length < 8) {
                return setError("Password must be at least 8 characters long.");
            }
            if (password !== confirmPassword) {
                return setError("Passwords do not match.");
            }
        }

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };


    const handleGithubLogin = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectUri = `${import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'}/login`;
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center text-indigo-500">
                    <Code2 size={48} />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
                    Welcome to Docgen AI
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400">
                    {isLogin ? "Sign in to your account" : "Create a new account"}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#111113] py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-800">

                    <div className="flex flex-col gap-4 mb-6">
                        <button
                            onClick={handleGithubLogin}
                            type="button"
                            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#24292e] hover:bg-[#1b1f23] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:ring-offset-[#111113]"
                        >
                            <Github className="w-5 h-5 mr-3" />
                            Continue with GitHub
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#111113] text-gray-400">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Name</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 bg-[#0A0A0B] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email address</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 bg-[#0A0A0B] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 bg-[#0A0A0B] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 bg-[#0A0A0B] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-400 text-sm font-medium bg-red-400/10 p-2 rounded-md border border-red-400/20">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#111113]"
                            >
                                {isLogin ? "Sign in with Email" : "Sign up with Email"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
