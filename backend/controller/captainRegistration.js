const captainSchema = require('../model/captainSchema');
const jwt = require('jsonwebtoken');
const {decryptPassword,encryptoPassword } = require('../model/hashing');
const blackListToken = require('../model/blackListToken');
const key = process.env.KEY;
const privateKey = process.env.privateKeyCatain;
const captainRegister = async (req, res) => {
    const { captainName, email, password, socketId, drivingLicence, vehical, isAvaliable, location } = req.body;
    console.log(vehical.vName);
    // Validation: Check required fields
    if (!captainName || !email || !password || !drivingLicence || !vehical?.vName || !vehical?.vColor || !vehical?.vNumber || !vehical?.vModel || !vehical?.vCapacity) {
        return res.status(400).json({ status: "Please provide complete details" });
    }

    // Check if user is already registered
    const user = await captainSchema.findOne({ email });
    if (user) {
        return res.status(400).json({ status: "Already registered" });
    }

    // Encrypt password
    const hashed = encryptoPassword(password, key);

    // Save data to DB
    const captain = await captainSchema.create({
        captainName,
        email,
        password: hashed,
        socketId: socketId || "", 
        drivingLicence,
        vehical,
        isAvaliable: isAvaliable ?? true, 
        location: location || "Not provided",
    });
    const token = jwt.sign({ id : captain.id }, privateKey , {expiresIn : '1hr'})
    // Send success response
    res.status(200).json({
        status: "Successfully registered",
        captain,
        token,
    });
};

const captainLogin =async (req,res)=>{
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(401).send({status : 'please provide complete details'})
    }
    const captain = await captainSchema.findOne({email}).select('+password');
    if(!captain){return res.status(401).send({status : 'unknown captain'})}
    const coded = decryptPassword(captain.password , key);
    if(coded !=password){
        return res.status(401).send({status : 'unauthorized access'});
    }
    const token = jwt.sign({ id : captain.id }, privateKey , {expiresIn : '1hr'})
    res.status(200).send({status : 'done' , token})

}
const getCapatinDetails = async (req,res)=>{
    const captain = await captainSchema.findById({_id : req.userId});
    res.send(captain);
}
const captainLogout =async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    await blackListToken.create({
        token,
    })
    res.status(200).send({status :'logout successfully' })
}
module.exports = {
    captainRegister,
    captainLogin,
    captainLogout,
    getCapatinDetails,
}