const dotenv = require("dotenv").config(),
    express = require("express"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    cookieParser = require("cookie-parser"),
    path = require("path"),
    userRoute = require('./routes/userRoutes'),
    productRoute = require("./routes/productRoute"),
    contactRoute = require("./routes/contactRoute"),
    errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ urlencoded: false }))
// app.use(cors({ origin: ["http://localhost:3000", "https://inventorybillingapp-mern.netlify.app"], credentials: true }));
app.use(cors({ origin: true, credentials: true }));
// app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
// app.use(cors({ origin: "https://inventorybillingapp-mern.netlify.app", credentials: true }));

// Routes Middleware
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contact', contactRoute);

// Serve Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error Middleware (should be last)
app.use(errorHandler);

// Default Route
app.get("/", (req, res) => {
    res.send("Homepage");
});

// Server Port
const PORT = process.env.PORT || 5000;

// Connect to DB and Start Server
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is Running on port ${PORT}`);
        });
    })
    .catch((err) => console.log("Database connection failed:", err));