import express from 'express';
import cors from 'cors';

/**
 * Loads environment variables from the .env file into process.env
 */
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import currencyRoutes from './routes/currencyRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

/**
 * Enable CORS to allow cross-origin requests from the frontend at http://localhost:3000
 */
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

/**
 * Middleware for parsing JSON request bodies
 */
app.use(express.json());

/**
 * Connect to MongoDB using the URI from the environment variables
 */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected with MongoDB'))
    .catch((error) => console.error('MongoDB-Connection-Error:', error));

/**
 * Use currency-related routes with the base path /api
 */
app.use('/api', currencyRoutes);

/**
 * Use authentication-related routes with the base path /api/auth
 */
app.use('/api/auth', authRoutes);

/**
 * Start the server on the specified port or default to 5000
 * @type {*|number}
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server runs on Port ${PORT}`);
});