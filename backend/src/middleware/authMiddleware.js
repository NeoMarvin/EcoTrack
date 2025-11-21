// In src/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // 1. Get the token from the request header
    const token = req.header("Authorization");
    
    // --- DEBUGGING ---
    console.log("--- Auth Middleware ---");
    console.log("Token Received:", token);
    // -------------------

    // 2. Check if no token is present
    if (!token) {
        console.log("Error: No token found.");
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // 3. If there is a token, verify it
    try {
        // The token will look like "Bearer [token]". We need to get just the token part.
        const tokenString = token.split(' ')[1]; // Get the part after "Bearer "

        // --- DEBUGGING ---
        console.log("Token String to Verify:", tokenString);
        // -------------------

        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

        // --- DEBUGGING ---
        console.log("Token Decoded Successfully:", decoded);
        // -------------------

        req.user = decoded.user;
        next();
    } catch (err) {
        // --- DEBUGGING ---
        console.error("Token verification FAILED:", err.message);
        // -------------------
        res.status(401).json({ msg: "Token is not valid" });
    }
};