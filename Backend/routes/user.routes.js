const express =require("express");
const {body} = require("express-validator");
const router = express.Router();
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware')

//For Registeration
router.post('/register', [
    body("email")
        .isEmail()
        .withMessage('Invalid Email'),
    body("fullname.firstname")
        .isLength({min:3})
        .withMessage('First name must be at least 3 character long'),
    body("password")
        .isLength({min:6})
        .withMessage('password must be at least 6 character long'),

],userController.registerUser);

//Login
router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Invalid Password'),

],userController.loginUser);

//Get Profile
router.get('/profile', authMiddleware.authUser,userController.getUserProfile);
// logout
router.get('/logout', authMiddleware.authUser,userController.getUserProfile);


module.exports = router;
