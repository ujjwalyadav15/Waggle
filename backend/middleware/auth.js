const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get the token from the request header
    // The standard format is "Bearer TOKEN"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // If no token is found, deny access
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret');
        
        // Add the decoded user information to the request object
        // This makes it available in your route handlers (e.g., req.user)
        req.user = decoded;
        
        // Proceed to the next middleware or the route handler
        next();
    } catch (ex) {
        // If the token is not valid, send an error
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;
