const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const { connectDB } = require('./Database/database');
const userRoutes =require('./routes/user.routes')


connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/users',userRoutes);

module.exports = app;
