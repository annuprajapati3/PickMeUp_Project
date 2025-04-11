const mongoose = require('mongoose');
const ride = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        require :true,
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captainSchema'
    },
    pickup:{
        type:String,
        require:true,
    },
    destination:{
        type:String,
        require:true,
    },
    fare :{
        type:Number,
        require:true,
    },
    vType:{
        type:String,
        require : true,
    },
    status:{
        type:String,
        enum :['waiting' , 'accepted' , 'riding' , 'terminate' , 'complete'],
        default:'waiting',
    },
    duration :{
        type:Number,
    },
    distance :{
        type:Number,
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature :{
        type:String,
    },
    otp :{
        type:Number,
        select : false,
        require : true,
    }

})
module.exports = mongoose.model('ride' ,ride)