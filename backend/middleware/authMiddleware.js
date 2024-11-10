import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware function to protect routes, ensuring only authenticated users can access them.
 * In Express and other web frameworks, middleware is a function that performs specific tasks
 * in the HTTP request chain, like intercepting requests, processing data, or authenticating,
 * before passing the request to the final route.
 *
 * @param req //Request: Holds HTTP request details, like headers and parameters, and allows access to the Authorization header.
 * @param res //Response: Sends responses to the client, like 401 Unauthorized if the token is missing or invalid.
 * @param next //Passes control to the next middleware or route handler if authentication succeeds.
 * @returns {Promise<void>}
 */
const protect = async (req, res, next) => {
    // Initialize a variable to store the token from the Authorization header
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token by splitting the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the secret key, retrieving the user data (like user ID) embedded in the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user in the database using the ID from the decoded token, excluding the password field
            req.user = await User.findById(decoded.id).select('-password');

            // Call next() to proceed to the next middleware or route handler
            next();
        } catch (error) {
            // If the token verification fails, respond with 401 Unauthorized and an error message
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        // If no token is found in the Authorization header, respond with 401 Unauthorized
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;
