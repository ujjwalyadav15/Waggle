const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// --- Get user profile by ID (PROTECTED) ---
router.get('/profile/:userId', auth, async (req, res) => {
    if (req.user.userId !== req.params.userId) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own profile.' });
    }
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// --- User Registration ---
router.post('/add', (req, res) => {
    const { name, email, password } = req.body;
    
    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    newUser.save()
        .then(savedUser => {
            console.log('User registered:', savedUser);
            res.status(201).json(savedUser);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error registering user' });
        });
});

// --- User Authentication (Login) ---
router.post('/authenticate', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_default_secret', { expiresIn: '1h' });
        
        res.status(200).json({ message: 'Login successful', token, payload: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during authentication' });
    }
});

// --- Google Sign-In ---
router.post('/google-signin', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        // If user doesn't exist, create a new one
        if (!user) {
            // Google doesn't provide a password, so we create a strong, random one
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(randomPassword, 10);
            
            user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword, 
            });
            await user.save();
        }
        
        // Create a JWT token for the user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_default_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Google sign-in successful', token, payload: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during Google sign-in' });
    }
});


// --- Get All Users (Fixes your error) ---
router.get('/getall', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching users' });
        });
});


module.exports = router;
