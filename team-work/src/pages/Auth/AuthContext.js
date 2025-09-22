import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios'; // استيراد apiClient
import { jwtDecode } from 'jwt-decode'; // تأكد من تثبيت jwt-decode بقول: npm install jwt-decode

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        return accessToken ? { access: accessToken, refresh: refreshToken } : null;
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (tokens?.access) {
            try {
                const decoded = jwtDecode(tokens.access);
                // تحقق من صلاحية التوكن هنا إذا أردت
                setUser({ username: decoded.username, email: decoded.email }); // أو أي بيانات أخرى من التوكن
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
            } catch (error) {
                console.error("Invalid token:", error);
                logout(); // تسجيل الخروج إذا كان التوكن غير صالح
            }
        }
    }, [tokens]);

    const login = (newTokens) => {
        localStorage.setItem('accessToken', newTokens.access);
        localStorage.setItem('refreshToken', newTokens.refresh);
        setTokens(newTokens);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newTokens.access}`;
        navigate('/dashboard'); // أو أي صفحة رئيسية بعد تسجيل الدخول
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setTokens(null);
        delete apiClient.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const authContextValue = {
        user,
        tokens,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook مخصص لتسهيل استخدام الـ context
export const useAuth = () => {
    return useContext(AuthContext);
};