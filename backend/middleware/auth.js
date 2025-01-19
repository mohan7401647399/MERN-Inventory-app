const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    try {
        // Check for token in cookies
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Not authorized, Please login" });
            return;
        }

        // Verify the token
        let verifiedToken;
        try {
            verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            res.status(401).json({ message: "Invalid or expired token" });
            return;
        }

        // Get user from the database
        const user = await User.findById(verifiedToken.id).select("-password");
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        // Attach user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Authorization error:", error.message);
        res.status(401).json({ message: "Authorization error" });
    }
});

module.exports = protect;