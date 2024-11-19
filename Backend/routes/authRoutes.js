const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User'); // Ensure User schema is defined correctly
const router = express.Router();

// Middleware to parse incoming requests
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Secret key for JWT (ensure this is stored securely, e.g., in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Utility function to generate a JWT token
const generateJwtToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
};

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password, phoneNo, role } = req.body;

    // Validate request body
    if (!username || !password || !phoneNo || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ username, password: hashedPassword, phoneNo, role });
        await newUser.save();

        // Generate JWT token
        const token = generateJwtToken(newUser);

        // Send response with token and role
        res.status(201).json({ message: 'User registered successfully', token, role: newUser.role });
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ message: 'Error in registration', error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateJwtToken(user);

        // Return token and role in the response
        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Error in login', error: error.message });
    }
});

module.exports = router;
