const captainModle = require('../Models/captain.modle');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

 
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
        //console.log(token);
        
        // Send the response with the token and user data
        res.status(201).json({ token, captain });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
        
}
module.exports = {registerCaptain};