import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const deleteUser = (id, token) => axios.delete(`${API_URL}/auth/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});
export const updateUsername = (id, newUsername, token) => axios.put(`${API_URL}/auth/user/${id}/username`, { newUsername }, {
    headers: { Authorization: `Bearer ${token}` }
});
export const updatePassword = (id, newPassword, token) => axios.put(`${API_URL}/auth/user/${id}/password`, { newPassword }, {
    headers: { Authorization: `Bearer ${token}` }
});

export const fetchAllExchangeRates = () => axios.get(`${API_URL}/currency`);
export const addExchangeRate = (data, token) => axios.post(`${API_URL}/currency`, data, {
    headers: { Authorization: `Bearer ${token}` }
});
export const updateExchangeRate = (id, data, token) => axios.put(`${API_URL}/currency/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
});
export const deleteExchangeRate = (id, token) => axios.delete(`${API_URL}/currency/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});
export const convertCurrency = (data) => axios.post(`${API_URL}/convert`, data);
export const convertCurrencyReverse = (data) => axios.post(`${API_URL}/convert-reverse`, data);
