const asyncHandler = require("express-async-handler"),
    jwt = require("jsonwebtoken"),
    User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(400)
            throw new Error("Not authorized, Please login")
        }
        //  verify token
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(verifiedToken)
        //  get user id from the token
        const user = await User.findById(verifiedToken.id).select("-password");
        console.log(user)
        if (!user) {
            res.status(401)
            throw new Error("User is not found")
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401)
        console.log(error);
        throw new Error("Authorization error")
    }
})

module.exports = protect