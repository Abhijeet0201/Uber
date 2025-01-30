const userModel = require("../Models/user.model");
const jwt = require('jsonwebtoken');
const captainModle = require("../Models/captain.modle")
const blacklistToken = require("../Models/backlistToken.modle");

const authUser = async (req,res,next) => {

    
    const token = req.cookies?.token || 
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({message:'Unauthorize'});
    }
    const isblacklisted = await blacklistToken.findOne({token: token});
    if (isblacklisted) {
        return res.status(401).json({message:'Unauthorized token'});
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
const authCaptain = async (req,res,next) => {

    const token = req.cookies?.token || 
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({message:'Unauthorize'});
    }
    const isblacklisted = await blacklistToken.findOne({token: token});
    console.log(isblacklisted);
    

    if (isblacklisted) {
        return res.status(401).json({message:'Unauthorized token'});
    }
    
    try {
        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModle.findById(decoder._id);

        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }
        req.captain = captain;
        return next();
        
    } catch (error) {
        
        return res.status(401).json({message:'Unauthorize'})
    }
}

module.exports = {authUser,authCaptain};