const userModel = require("../Models/user.model");
const jwt= require('jsonwebtoken');

const authUser = async (req,res,next) => {

    
    const token = req.cookies?.token || 
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({message:'Unauthorize'});
    }
    
    
    try {
        const decoder = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoder._id)
        
        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({message:'Unauthorize'})
    }
}

module.exports = {authUser};