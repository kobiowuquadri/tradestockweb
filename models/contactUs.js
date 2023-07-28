const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required: true
    }
})

const contactModel = mongoose.model('contactmodel', contactSchema)

module.exports = contactModel