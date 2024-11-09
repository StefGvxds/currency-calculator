import express from 'express';
import cors from 'cors';

//Loads the .env file with the environment variables
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import currencyRoutes from './routes/currencyRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Die URL deines Frontends
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected with MongoDB'))
    .catch((error) => console.error('MongoDB-Connection-Error:', error));

// Use the currency routes
app.use('/api', currencyRoutes);
// Use the Authentication routes
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server runs on Port ${PORT}`);
});