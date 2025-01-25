const { validationResult } = require("express-validator");
const userModel = require("../Models/user.model");
const userService = require("../services/user.service");

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

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};
const getUserProfile = async (req,res) => {
    res.status(200).json(req.user);
}

module.exports = { 
    registerUser,
    loginUser,
    getUserProfile

};
