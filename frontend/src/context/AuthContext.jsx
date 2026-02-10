import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, loginEmploye } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials, type = 'admin') => {
        try {
            let response;
            if (type === 'admin') {
                response = await loginAdmin(credentials);
            } else {
                response = await loginEmploye(credentials);
            }

            const userData = { ...response.data.user, role: response.data.role };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, message: error.response?.data || "Login failed" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
