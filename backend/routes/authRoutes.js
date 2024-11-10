import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Login-Endpoint
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token, userId: user._id, username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Registering a new user
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * Delete user
 * Only authenticated users can access this function >protect<
 */
router.delete('/user/:id', protect, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Change password
 * Only authenticated users can access this function >protect<
 */
router.put('/user/:id/password', protect, async (req, res) => {
    const { newPassword } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Change username
 * Only authenticated users can access this function >protect<
 */
router.put('/user/:id/username', protect, async (req, res) => {
    const { newUsername } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = newUsername;
        await user.save();

        res.json({ message: 'Username updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
