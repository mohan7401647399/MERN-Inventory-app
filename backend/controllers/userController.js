const asyncHandler = require("express-async-handler"),
    User = require("../models/userModel"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcryptjs"),
    Token = require("../models/tokenModel"),
    crypto = require("crypto"),
    sendEmail = require("../utils/nodemailer");
const token = require("../models/tokenModel");

//  JWT token generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

//  Register new User
const userRegister = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all required details")
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be upto 6 characters")
    }

    //check if user already exist
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("Email already exists")
    }

    //create a new user
    const newUser = await User.create({ name, email, password })

    // generate token
    const token = generateToken(newUser._id)

    //send HTTP-only cookies
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),       // 1 day
        sameSite: "none",
        secure: true
    })

    if (newUser) {
        const { _id, name, email, photo, phone, bio } = newUser
        res.status(201).json({ _id, name, email, photo, phone, bio, token })
    } else {
        res.status(400)
        throw new Error("user creation failed")
    }

    // if (!req.body.email) {
    //     res.status(400);
    //     throw new Error("Please add a email")
    // }
    // res.send("User Register")
})

//  Login existing User
const LoginUser = asyncHandler(async (req, res) => {
    // res.send("user login");
    const { email, password } = req.body;

    // validate request
    if (!email || !password) {
        res.status(400)
        throw new Error("Please enter email and password")
    }

    // check if user already exists in DB
    const userExist = await User.findOne({ email })

    if (!userExist) {
        res.status(400)
        throw new Error("User not found, Please signup")
    }

    // password check
    const passwordCheck = await bcrypt.compare(password, userExist.password)

    // generate token
    const token = generateToken(userExist._id)

    //send HTTP-only cookies
    if (passwordCheck) {
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),       // 1 day
            sameSite: "none",
            secure: true
        })
    }

    if (userExist && passwordCheck) {
        const { _id, name, email, photo, phone, bio } = userExist
        res.status(201).json({ _id, name, email, photo, phone, bio, token })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
})

// Logout
const logOut = asyncHandler(async (req, res) => {
    //send HTTP-only cookies
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true
    })
    return res.status(200).json({ message: "Successfully logged out" })
})

//get user data
const getUser = asyncHandler(async (req, res) => {
    const ExistingUser = await User.findById(req.user._id)
    if (ExistingUser) {
        const { _id, name, email, photo, phone, bio } = ExistingUser
        res.status(200).json({ _id, name, email, photo, phone, bio })
    } else {
        res.status(400)
        throw new Error("User is not found")
    }
})

//  Log In status
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false)
    }
    //  verify token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (verifiedToken) {
        return res.json(true)
    } else {
        return res.json(false)
    }
})

//  Update user
const userUpdate = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { name, email, photo, phone, bio } = user;
        user.email = email;
        user.name = req.body.name || name;
        user.photo = req.body.photo || photo;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, photo: updatedUser.photo, phone: updatedUser.phone, bio: updatedUser.bio
        })
    } else {
        res.status(404);
        throw new Error("User updation is not done")
    }

})

//  change password
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;

    if (!user) {
        res.status(400);
        throw new Error("User not found, please signup");
    }
    if (!oldPassword || !password) {
        res.status(400);
        throw new Error("Please add old and new password");
    }

    //  old password match in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    // save a new password
    if (user && passwordIsCorrect) {
        user.password = password
        await user.save()
        res.status(200).send("Password changed successful")
    } else {
        res.status(400)
        throw new Error("Old password is Incorrect, Please try with correct password")
    }
})

//  forgotPassword
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }

    //  Delete token in DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await Token.deleteOne()
    }

    //  Create reset Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);

    //  Hash token to DB
    const hasedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    //  Save Token to DB
    await new Token({ userId: user._id, token: hasedToken, createdAt: Date.now(), expiresAt: Date.now() + 30 * (60 * 1000) }).save()   //thirty minutes

    //  Reset URL
    const resetUrl = `${process.env.BASE_URL}/resetpassword/${resetToken}`;

    //  Reset Email
    const msg = ` <h2>Hello ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for 30 minutes only.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards,</p>
      <p>R Mohan</p>`;

    const sub = "Password Reset Request",
        sendTo = user.email,
        sentFrom = process.env.USER

    try {
        await sendEmail(sub, msg, sendTo, sentFrom);
        res.status(200).json({ success: true, message: "Reset Email Sent" })
    } catch (error) {
        res.status(500)
        throw new Error("Email not sent, please try again")
    }
})

//  resetpassword
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;

    //  Hash token & compare to Token in DB
    const hasedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    //  find token in DB
    const userToken = await Token.findOne({ token: hasedToken, expiresAt: { $gt: Date.now() } })

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or Expired Token");
    }

    //  find user
    const user = await User.findOne({ _id: userToken.userId })
    user.password = password
    await user.save()

    res.status(200).json({ message: "Password Reset Successful, Please login again" })

})

module.exports = { userRegister, LoginUser, logOut, getUser, loginStatus, userUpdate, changePassword, forgotPassword, resetPassword }