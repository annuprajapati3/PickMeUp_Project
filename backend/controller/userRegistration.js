const userSchema = require('../model/userSechma')
const blackListToken = require('../model/blackListToken')
const jwt = require('jsonwebtoken')
const { encryptoPassword, decryptPassword } = require('../model/hashing');
const key = process.env.KEY || 'default_secret_key';
const privateKey = process.env.privateKey;
const userReg = async (req,res)=>{
    const {userName ,email,password , socketId } = req.body;
    if(!userName || !email || !password ){
        return res.status(400).send({status : 'please provide complete details'})
    }
    const encryptedText = encryptoPassword(password ,key);
    const user =  new userSchema({
        userName,
        email,
        password : encryptedText,
        socketId,
    })
    await user.save();
    const token = jwt.sign({ id : user.id }, privateKey , {expiresIn : '1hr'})
    res.status(200).send({status : 'done' , user , token})
}
const userLogin = async(req,res)=>{
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(401).send({status : 'please provide complete details'});
    }
    const user = await userSchema.findOne({email}).select('+password');
    if(!user){
        return res.status(401).send({status : 'invalid user'});
    }
    const op = decryptPassword(user.password, key);
    if(op===password){
        const token = jwt.sign({ id : user.id }, privateKey , {expiresIn : '1hr'})
        res.status(200).json({
            user,

            token,
        })
    }else{
        return res.status(401).send({status : 'invalid user'});
    }
}
const getUserDetails  = async (req,res)=>{
    const user = await userSchema.findById({_id : req.userId})
    res.status(200);
    res.send(user);
}
const userLogOut = async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    await blackListToken.create({token})
    res.send({status : 'Logout successfully'})
}
module.exports = {
    userReg,
    userLogin,
    getUserDetails,
    userLogOut,
}













