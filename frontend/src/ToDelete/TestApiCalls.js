// frontend/src/Components/TestApiCalls.js

import React, { useState } from 'react';
import { registerUser, loginUser, fetchAllExchangeRates, addExchangeRate } from '../Services/Api';

const TestApiCalls = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            const res = await registerUser({ username: 'testuser', password: 'password123' });
            setResponse(res.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = async () => {
        try {
            const res = await loginUser({ username: 'testuser', password: 'password123' });
            setResponse(res.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFetchExchangeRates = async () => {
        try {
            const res = await fetchAllExchangeRates();
            setResponse(res.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddExchangeRate = async () => {
        try {
            const res = await addExchangeRate(
                { baseCurrency: 'USD', targetCurrency: 'EUR', exchangeRate: 0.85 },
                localStorage.getItem('token')
            );
            setResponse(res.data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>API Testing</h2>
            <button onClick={handleRegister}>Register User</button>
            <button onClick={handleLogin}>Login User</button>
            <button onClick={handleFetchExchangeRates}>Fetch Exchange Rates</button>
            <button onClick={handleAddExchangeRate}>Add Exchange Rate</button>
            <div>
                <h3>Response:</h3>
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
            <div>
                <h3>Error:</h3>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        </div>
    );
};

export default TestApiCalls;
