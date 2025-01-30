const captainModle = require('../Models/captain.modle');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistToken = require('../Models/backlistToken.modle')
 
const registerCaptain = async (req, res, next) => {
    try {
        // Validate the request body for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body);
        const { fullname, email, password, vehicle } = req.body;
        //checking captain existing
        const isCaptainAlreadyExist = await captainModle.findOne({email});
        if (isCaptainAlreadyExist) {
            return res.status(400).json({message: 'Captain already exist'})
        }
        
        const hashedPassword = await captainModle.hashPassword(password);

        // Create a new user in the database
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        // Generate the authentication token
        const token = captain.generateAuthToken();
        console.log("Generated token",token);
        
        // Send the response with the token and user data
        res.status(201).json({ token, captain });
    } catch (error) {
        console.error("Error during captain registration:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
        
}
const loginCaptain = async (req, res, next) => {
    try {
        // Validate the request body for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body);
        const { email, password} = req.body;
        //checking captain existing
        const captain = await captainModle.findOne({email}).select('+password');
        if (!captain) {
            return res.status(400).json({message: 'Invalid email'})
        }
        
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message:'Invalid email or password'})
        }

        // Generate the authentication token
        const token = captain.generateAuthToken();
        
        res.cookie('token', token,
            { httpOnly: true, secure: true, sameSite: "Strict" }
        );
        res.status(200).json({token,captain});
    } catch (error) {
        console.error("Error during  captain login:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
        
};
const getCaptainProfile = async (req,res) => {
    res.status(200).json({captain: req.captain});
};
const logoutCaptain = async (req,res) => {
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
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
};