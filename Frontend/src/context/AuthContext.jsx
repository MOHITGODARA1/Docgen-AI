import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Axios Instance that attaches credentials
// eslint-disable-next-line react-refresh/only-export-components
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    withCredentials: true,
});

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const { data } = await api.get("/auth/check");
                setUser(data);
            } catch (error) {
                console.error("Auth check failed:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUserAuth();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        setUser(data);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await api.post("/auth/register", { name, email, password });
        setUser(data);
        return data;
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    };

    const setOAuthUser = (authData) => {
        setUser(authData);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, setOAuthUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
