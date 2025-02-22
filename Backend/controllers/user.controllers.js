const { validationResult } = require("express-validator");
const userModel = require("../Models/user.model");
const userService = require("../services/user.service");
const blacklistToken =require('../Models/backlistToken.modle')

//register
const registerUser = async (req, res) => {
    try {
        // Validate the request body for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //console.log(req.body);
        const { fullname, email, password } = req.body;

        const isUserAlreadyExist = await userModel.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({message: 'User already exist'})
        }
        const hashedPassword = await userModel.hashPassword(password);

        // Create a new user in the database
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });
        console.log(userService);

        // Generate the authentication token
        const token = user.generateAuthToken();

        // Send the response with the token and user data
        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};

// login 
const loginUser = async (req, res) => {
    try {
        // Validate the request body for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //console.log(req.body);
        const { email, password } = req.body;
        
        const user = await userModel.findOne({email}).select('+password');
        if (!user) {
            return res.status(401).json({message:'Invalid email or password'})
        }
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({message:'Invalid email or password'})
        }
    
        // Generate the authentication token
        const token = user.generateAuthToken();
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production'
        })

        res.status(200).json({token,message:"login successfully"});
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};
const getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
}
const logoutUser = async (req, res) => {
   
    const token = req.cookies?.token || 
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    try {
        await blacklistToken.create({ token }); 
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });  
        
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "Server error during logout" });
    }
}

module.exports = { 
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser

};
