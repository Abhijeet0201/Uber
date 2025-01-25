const { validationResult } = require("express-validator");
const userModel = require("../Models/user.model");
const userService = require("../services/user.service");

const registerUser = async (req, res) => {
    try {
        // Validate the request body for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //console.log(req.body);
        const { fullname, email, password } = req.body;

        // Check if the email already exists in the database
        /* const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        } */

        // Hash the password
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

module.exports = { registerUser };
