const mongoose = require('mongoose')
require('dotenv').config()


async function connectionToDb(){
   await mongoose.connect(process.env.MONGODB_URL)
   .then(() => console.log('connected to database successfully'))
   .catch(err => console.log(err.message))
}


connectionToDb()