const nodemailer = require("nodemailer");

const sendEmail = async (sub, msg, sendTo, sentFrom, replyTo) => {
    // Create Email Transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    // Sending options for email
    const mailOptions = {
        from: sentFrom,
        to: sendTo,
        replyTo: replyTo,
        subject: sub,
        html: msg
    }

    //send email
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}

module.exports = sendEmail;