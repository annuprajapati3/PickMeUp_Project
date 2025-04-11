const { getDistancefunction ,getAddressCondinatorfx} = require('../controller/MapServices');
const captainSchema = require('../model/captainSchema');
const userSchema = require('../model/userSechma')
const ride = require('../model/ride');
const { messageSend } = require('../Socket');

const fare = (distance) => {
    if (typeof distance === "string") {
        distance = parseFloat(distance.replace(/[^0-9.]/g, "")); 
    } else {
        distance = parseFloat(distance); 
    }
    const BaseFare = {
        car: 30,
        auto: 20,
        motor: 10,
    };

    const PerKmRate = {
        car: 15,
        auto: 10,
        motor: 5,
    };

    const WaitingCharge = {
        car: 3,
        auto: 2,
        motor: 1,
    };

    return {
        Car: BaseFare.car + (PerKmRate.car * distance) + WaitingCharge.car,
        Auto: BaseFare.auto + (PerKmRate.auto * distance) + WaitingCharge.auto,
        Motor: BaseFare.motor + (PerKmRate.motor * distance) + WaitingCharge.motor,
    };
};
const otp = ()=>{
    return Math.floor(100000 + Math.random() * 900000)
}
const getCaptainNearMe = async ( lng,lat) => {
    
    
    try {
      const captains = await captainSchema.find({
        location: {
          $geoWithin: {
            $centerSphere: [ [lng, lat], 12 / 6371 ]
          }
        }
      })
      return captains;
    } catch (error) {
      console.error("Error fetching nearby captains:", error)
      return [];
    }
};

const Ride = async (req, res) => {
    const { pickup, destination, vType } = req.body;
    if (!pickup || !destination || !vType) {
        return res.send({ status: 'Provide complete details' });
    }

    const distance = await getDistancefunction(pickup, destination);
    const rideFare = fare(distance)[vType];

    if (isNaN(rideFare)) {
        return res.send({ status: 'Invalid vehicle type or distance' });
    }

    const newRide = new ride({
        user: req.userId,
        pickup,
        destination,
        fare: rideFare,
        vType,
        otp : otp(),
    });

    await newRide.save();
    const lngi = await getAddressCondinatorfx(pickup);
    const cap = await getCaptainNearMe(Number(lngi.lng) ,Number(lngi.lat));
    newRide.otp = '';
    const NewUser = await userSchema.findById(req.userId);
    
    cap.map((captains)=>{
        messageSend(captains.socketId , {
            event : 'new-ride',
            data :{
                newRide,
                NewUser,
            }
        })
    })
    res.send(newRide);

};
const RideConfirm = async (req,res)=>{
    const {rideId} = req.body;
    if(!rideId){
        return res.status(401).send("Error fetching in ride details")
    }
    await ride.findByIdAndUpdate(rideId , {
        captain : req.userId,
        status :  'accepted',
    }) 
    const ride_confirm = await ride.findOne({
        _id : rideId
    }).populate('user').populate('captain').select('+otp');
    messageSend(ride_confirm.user.socketId , {
        event : 'ride-confirm',
        data : ride_confirm,
    })
    res.send(ride_confirm);
}
const RideFare = async (req , res)=>{
    const pickup = req.query.pickup;
    const destination = req.query.destination;
    const distance = await getDistancefunction(pickup, destination);
    const fared = fare(distance)
    res.send({
        status : 'ok',
         fared,
    })

}
const RideStart = async (req , res)=>{
    const {rideId ,  otp } = req.body;
    if(!rideId || !otp ){
        return res.status(404).send(" ride id or otp  is not there");
    }
    const RideInfo = await ride.findById({_id : rideId}).populate("user").populate("captain").select('+otp');
    if(!RideInfo){
        return res.status(404).send("ride not found");
    }
    const ride_otp = RideInfo.otp;
    if(otp!=ride_otp){
        return res.status(404).send("invalid otp");
    }
    if(RideInfo.status != 'accepted'){
        return res.status(404).send("ride not accepted");
    }
    await ride.findByIdAndUpdate({_id:rideId} , {
        status : "riding",
    })
    messageSend(RideInfo.user.socketId , {
        event : "ride-start" , 
        data : {
            RideInfo,
        }
    })
    res.send(RideInfo);
    
}
const RideEnd = async (req , res)=>{
    const {rideId} = req.body;
    const captainId = req.userId;
    console.log(rideId)
    console.log(captainId)
    if(!rideId){
        return res.status(404).send("ride is not there");
    }
    const Ride = await ride.findOne({_id : rideId ,
        captain : captainId,
    }).populate('user').populate('captain').select('+otp');
    if(!Ride){
        return res.status(404).send("ride is not there");
    }
    if(Ride.status != "riding"){
        return res.status(404).send("ride is not started");
    }
    
    const UpdatedRide=await ride.findByIdAndUpdate({_id : rideId},{
        status : 'complete',
    })
    messageSend(Ride.user.socketId , {
        event : 'ride-end',
        data :UpdatedRide,
    })
    res.status(200).send(UpdatedRide);
} 
module.exports = {
    Ride,
    RideFare,
    getCaptainNearMe,
    RideConfirm,
    RideStart,
    RideEnd,
}