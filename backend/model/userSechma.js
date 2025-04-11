const mongoose = require('mongoose');
const userScehma = new mongoose.Schema({
    userName :{
        type:String,
        require :true,
    },
    email :{
        type:String,
        require:true,
    },
    password :{
        type:String,
        require:true,
        select : false,
    },
    socketId :{
        type :String,
    }
})
module.exports = mongoose.model('userSchema' , userScehma)
