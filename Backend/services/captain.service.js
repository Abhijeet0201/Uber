const captainModle =require ("../Models/captain.modle");


const createCaptain = async ({firstname, lastname, email, password,
     color, plate, capacity, vehicleType

}) => {
    if (!firstname ||!email || !password  || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All field are required')
    }
    const captain = captainModle.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}

module.exports = {createCaptain};