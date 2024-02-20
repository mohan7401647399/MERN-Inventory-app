const express = require("express"),
    router = express.Router(),
    protect = require("../middleware/auth"),
    { contactUs } = require("../controllers/contactConroller");

router.post("/", protect, contactUs)

module.exports = router