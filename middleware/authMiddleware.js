const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
require('dotenv').config()


async function authRoute(req, res, next){
    const token = req.cookies.login
    if(token){
        await jwt.verify(token, process.env.JWT_SECRET, {}, (err, verified) => {
            if(err){
                console.log(err)
                res.redirect('/login')
            }else{
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
}

module.exports = {authRoute}