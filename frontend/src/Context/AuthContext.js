// src/Context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // Überprüfen, ob der Benutzer eingeloggt ist, wenn die App geladen wird
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedToken = localStorage.getItem('token');

        if (storedUsername && storedToken) {
            setIsAuthenticated(true);
            setUsername(storedUsername);
            setToken(storedToken);
        }
    }, []);

    // Login-Funktion zum Setzen von Username und Token im Zustand und localStorage
    const login = (user, authToken) => {
        setIsAuthenticated(true);
        setUsername(user);
        setToken(authToken);
        localStorage.setItem('username', user);
        localStorage.setItem('token', authToken);
    };

    // Logout-Funktion zum Löschen von Username und Token
    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null);
        setToken(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
