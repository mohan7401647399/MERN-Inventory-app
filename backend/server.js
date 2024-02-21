const dotenv = require("dotenv").config(),
    express = require("express"),
    mongoose = require("mongoose"),
    bpr = require("body-parser"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    userRoute = require('./routes/userRoutes'),
    productRoute = require("./routes/productRoute"),
    contactRoute = require("./routes/contactRoute"),
    errorHandler = require('./middleware/error'),
    cookieParser = require("cookie-parser"),
    path = require("path");

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ urlencoded: false }))
app.use(bodyParser.json());
// app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cors({ origin: true, credentials: true }));

//Routes middleware
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contact', contactRoute);

//error middleware
app.use(errorHandler)

//  path
app.use("uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.get("/", (req, res) => {
    res.send("Homepage")
})

const PORT = process.env.PORT || 5000

// Connect to DB and start the server
mongoose.connect(process.env.DB).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running port ${PORT}`);
    })
}).catch((err) => console.log(err))