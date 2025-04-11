const mongoose = require('mongoose');
const captainSchema = new mongoose.Schema({
    captainName :{
        type:String,
        require: true,
    },
    email :{
        type : String,
        require : true,
    },
    password :{
        type : String,
        require : true,
        select : false,
    },
    socketId :{
        type : String,
    },
    drivingLicence :{
        type : String,
        require: true,
    },
    vehical :{
        vName :{
            type : String,
            require : true,
        },
        vColor:{
            type : String,
            require : true,
        },
        vNumber :{
            type : String,
            require : true,
        },
        vType :{
            type : String,
            enum : ['car' ,'auto','motorCycle'],
            default : 'car' ,
        },
        vModel:{
            type : String,
            require : true,
        },
        vCapacity:{
            type : String,
            require : true,
            min :1,
        }
    },
    isAvaliable :{
        type:Boolean,
        default : true,
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point' // optional
        },
        coordinates: {
          type: [Number], // [lng, lat]
          default: undefined
        }
      }
      
})
captainSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('captainSchema' , captainSchema)