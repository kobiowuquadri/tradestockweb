const mongoose = require('mongoose');


const authSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    dateofbirth:{
        type: String,
        required: false
    },
    mobilenumber:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: false
    },
    state:{
        type: String,
        required: true
    },
    walletaddress:{
        type: String,
        required: true
    },
    
}, {timestamps: true});

const authModel = mongoose.model('authmodel', authSchema);

module.exports = authModel;