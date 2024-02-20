const asyncHandler = require("express-async-handler"),
    User = require("../models/userModel"),
    sendEmail = require("../utils/nodemailer");

const contactUs = asyncHandler(async (req, res) => {
    const { subject, message } = req.body;
    const user = await User.findById(req.user._id)

    //  user not found
    if (!user) {
        res.status(400);
        throw new Error("User not found, please signup");
    }

    //  sub or msg is empty
    if (!subject || !message) {
        res.status(400);
        throw new Error("Please add a subject and message");
    }

    const send_to = process.env.USER;
    const sent_from = process.env.USER;
    const reply_to = user.email;

    try {
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "message Sent" });
    } catch (error) {
        res.status(500);
        throw new Error("message not sent, please try again");
    }
})

module.exports = { contactUs }