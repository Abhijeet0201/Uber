const mongoose = require("mongoose");
 const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/uber");
        console.log("database connected");
        
    } catch (error) {
        console.log("database not connect");
        
    }
}
module.exports = {connectDB};