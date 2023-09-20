import { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwt.decode(token) : null;
        return decodedToken;
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/';
    };

    return <AuthContext.Provider value={{ user, setUser, handleLogout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}