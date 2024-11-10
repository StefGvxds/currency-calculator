import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    /**
     * Extract userID from token
     * @param token
     * @returns {*|null}
     */
    const getUserIdFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.id;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    /**
     * Check whether the user is logged in when the app is loaded
     */
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');

        if (storedUsername && storedToken) {
            const idFromToken = getUserIdFromToken(storedToken);
            setIsAuthenticated(true);
            setUsername(storedUsername);
            setToken(storedToken);
            setUserId(idFromToken);
        }
    }, []);

    /**
     *  Login function for setting username and token in the state and localStorage
     * @param user
     * @param authToken
     * @param id
     */
    const login = (user, authToken, id) => {
        const idFromToken = getUserIdFromToken(authToken);
        setIsAuthenticated(true);
        setUsername(user);
        setToken(authToken);
        setUserId(idFromToken);
        localStorage.setItem('username', user);
        localStorage.setItem('token', authToken);
        localStorage.setItem('userId', idFromToken);
    };

    /**
     * Logout function to delete username and token
     */
    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null);
        setToken(null);
        setUserId(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, token, userId, login, logout, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
