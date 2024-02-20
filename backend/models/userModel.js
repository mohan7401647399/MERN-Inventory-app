const mongoose = require("mongoose"),
    bcrypt = require("bcryptjs");

//users schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be up to 6 characters"],
        // maxLength: [20, "Password must less than 20 characters"],
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone: {
        type: Number,
        default: "+91"
    },
    bio: {
        type: String,
        default: "bio",
        maxLength: [250, "Password must less than 250 characters"],
    }
}, {
    timeStamps: true
})

// password encrypt to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    //password encrypt
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // console.log(hashedPassword);
    this.password = hashedPassword;
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User