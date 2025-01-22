const express = require("express");

const {connectDB} = require("./datebase/database");


const path = require("path");
const fs = require("fs");
const cors = require("cors");



const PORT = 8000;
const app = express();



connectDB()

// Check and create the 'upload' directory



// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.set('view engine', 'ejs');
app.set('views', './views'); // Specify the directory for views


// Middleware
app.use(express.json());




// Routes
app.use('',superadminRouter);// Use auth routes


//server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});