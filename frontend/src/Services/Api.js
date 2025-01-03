import axiosInstance from './axiosInstance';
import {useTranslation} from "react-i18next";

/**
 * User Authentication and Management APIs
 */
export const registerUser = (data) => axiosInstance.post('/auth/register', data);
export const deleteUser = (id) => axiosInstance.delete(`/auth/user/${id}`);
export const updateUsername = (id, newUsername) => axiosInstance.put(`/auth/user/${id}/username`, { newUsername });
export const updatePassword = (id, newPassword) => axiosInstance.put(`/auth/user/${id}/password`, { newPassword });

export const loginUser = async (data) => {
    const response = await axiosInstance.post('/auth/login', data);
    const { token, userId, username } = response.data;

    if (token) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    }
    return response;
};

export const logoutUser = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};

/**
 * Currency Exchange Rate APIs
 */
export const fetchAllExchangeRates = () => axiosInstance.get('/currency');
export const addExchangeRate = (data) => axiosInstance.post('/currency', data);
export const updateExchangeRate = (id, data) => axiosInstance.put(`/currency/${id}`, data);
export const deleteExchangeRate = (id) => axiosInstance.delete(`/currency/${id}`);
export const convertCurrency = (data) => axiosInstance.post('/convert', data);
export const convertCurrencyReverse = (data) => axiosInstance.post('/convert-reverse', data);


