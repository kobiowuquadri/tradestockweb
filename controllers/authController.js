const authModel = require('../models/authModel');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
require('dotenv').config();
const handleErrorss = require('../errorHandler/errorFunction')
const sendEmail = require("../utils/sendEmail")
const contactModel = require('../models/contactUs')



const handleErrors = (err) => {
    let errors = {email:"", password:""}
    if(err.message === "incorrect password"){
        errors.password = "Kindly enter a correct password"
        return errors
    }
    if(err.message === "incorrect email"){
       errors.email = "Incorrect email address"
       return errors
    }
    return errors
}

const getSignUp = async (req, res) => {
    res.render('signup')
};

const getLogin = async (req, res) => {
    res.render('login')
};

const getDeposit = async (req, res) => {
    res.render("deposit")
}




const postSignUp = async (req, res) => {
    try{
        const {email,
             password,
             firstname,
             lastname,
             dateofbirth,
             mobilenumber,
             address,
             country,
             state,
             walletaddress
             } = req.body
        //console.log(req.body)
        const salt = await bcrypt.genSalt()
        const harshedPassword = await bcrypt.hash(password, salt)
        const newUser = new authModel({
            email,
            password: harshedPassword,
            firstname,
             lastname,
             dateofbirth,
             mobilenumber,
             address,
             country,
             state,
             walletaddress
        })
        const savedUser = await newUser.save()
        res.status(201).redirect('/login')
    }
    catch(err){
        console.log(err)
    }
};

const postLogin = async (req, res) => {
    try{
        const {email, password} = req.body
        const foundUser = await authModel.findOne({email})
        if(foundUser){
            const correctPassword = await bcrypt.compare(password, foundUser.password)
            if(correctPassword){
                await jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, {}, async (err, token) => {
                    if(err){
                         console.log(err)
                    }else{
                        res.cookie('login', token, {maxAge: 1000*60*60, httpOnly: true})
                        res.cookie('userid', foundUser._id, {maxAge: 1000*60*60, httpOnly: true})
                       res.status(200).json({user: foundUser})
                    }
                })
            }
            else{
                throw Error("incorrect password")
            }
        }
        else{
            throw Error('incorrect email')
        }
    }
    catch(err){
        console.log(err)
        const errors = handleErrors(err)
        res.status(400).json({error: errors})
    }
};

const getUserDashboard = async (req, res) => {
    try{
           const id = req.cookies.userid
           const user = await authModel.findById(id)
            res.render("dashboard", {user})
    
    }catch(err){
        console.log(err)
    }
};

const logout = async (req, res) => {
    res.cookie("login", "", {maxAge:0})
    res.redirect('/login')
}

const getResetPassword = async (req, res) => {
    res.render("resetPassword")
}

const postResetPassword = async (req, res) => {
   try{
    const {email} = req.body
    const user = await authModel.findOne({email})
    if(!user){
        res.status(400).send("user with the given email does not exist")
    }
     await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:60*10}, async (err, token)=>{
        if(err){
            console.log(err)
        }else{
            const link = `http://localhost:3000/getUpdatedPassword/${user._id}`
            await sendEmail(user.email, "Password reset", link)
            res.cookie('tokenReset', user._id, {httpOnly:true})
            res.status(200).send("email has been sent to your email sucessfullly")
        }
     })
   }
   catch(err){
    console.log(err)
   }
}

const getUpdatedPassword = async (req, res) => {
    const id = req.cookies.tokenReset
  const userReset =  await authModel.findById(id)
   //console.log(userReset)
    res.render("submitUpdatedPassword", {userReset})
}

const submitUpdatedPassword = async (req, res) => {
      try{
        const id = req.params.id
        const newPassword = req.body.password
        const placeholder = await authModel.findById(id)
        const salt = await bcrypt.genSalt()
        const harshedPassword = await bcrypt.hash(newPassword, salt)
            const user = await authModel.findByIdAndUpdate(id, {
                email: placeholder.email,
                password: harshedPassword,
                firstname: placeholder.firstname,
                lastname: placeholder.lastname,
                dateofbirth: placeholder.dateofbirth,
                mobilenumber: placeholder.mobilenumber,
                address: placeholder.address,
                country: placeholder.country,
                state: placeholder.state,
                walletaddress: placeholder.walletaddress
            } )
                res.redirect("/login")
            }
        
      
      catch(err){
        console.log(err)
      }
}


const contactSupport = async (req, res) => {
    try{
        const {name, email, message} = req.body
        const newMessage = new contactModel({
            name,
            email,
            message
        })
        await newMessage.save()
        res.redirect('/')

    }
    catch(err){
        console.log(err)
    }
}

const getAbout = async (req,res) => {
    res.render("about")
}

module.exports = {getLogin,
                  getSignUp,
                  postLogin,
                  postSignUp, 
                  getUserDashboard,
                  logout,
                  postResetPassword,
                  getResetPassword,
                  submitUpdatedPassword,
                  getUpdatedPassword,
                  getDeposit,
                  contactSupport,
                  getAbout
                 };