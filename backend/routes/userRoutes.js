const express = require("express"),
    router = express.Router();

const { userRegister, LoginUser, logOut, getUser, loginStatus, userUpdate, changePassword, forgotPassword, resetPassword } = require('../controllers/userController');
const protect = require("../middleware/auth");

router.post('/register', userRegister);
router.post('/login', LoginUser);
router.get('/logout', logOut);
router.get('/getuser', protect, getUser);
router.get('/loggedIn', loginStatus);
router.patch('/updateuser', userUpdate);
router.post('/changepassword', protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router