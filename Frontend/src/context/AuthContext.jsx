import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
    withCredentials: true,
});

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const { data } = await api.get("/auth/me");
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

    const externalLoginSetUser = (data) => {
        setUser(data);
    };

    const logout = async () => {
        try {
            await api.get("/auth/logout");
        } catch (error) {
            console.error("Logout failed on server:", error);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, externalLoginSetUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
