const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('./database/db');
const authRoutes = require('./routes/authRoute');
const authModel = require('./models/authModel');
const sessions = require('express-session');
const sendEmail = require("./utils/sendEmail")
require('dotenv').config()



const app = express();
const port = process.env.PORT || 8888;

//middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(authRoutes);





app.get('/', async (req,res) => {
    const token = req.cookies.login
    console.log(token)
    let status = false
    if(token){
         status = true
    }
    console.log(status)
        res.render('index', {status});    
});





app.listen(port, () => console.log(`server running on localhost port: ${port}`));