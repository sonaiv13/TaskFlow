import { createContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, getCurrentUser } from "../services/authService.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = getCurrentUser();
        if(storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = async (email, password) => {
        const userData = await loginService(email, password);
        setUser(userData);
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}