const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const captainController =require('../controllers/captain.controller')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 character long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 character long'),
    body('vehicle.color').isLength({ min: 3}).withMessage('color must be at least 3 character long'),
    body('vehicle.plate').isLength({ min: 3}).withMessage('plate name must be at least 3 character long'),
    body('vehicle.capacity').isInt({ min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid type'),
],
captainController.registerCaptain
)
console.log(captainController);

module.exports = router;